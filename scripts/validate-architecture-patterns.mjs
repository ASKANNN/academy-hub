import { readdirSync, statSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const patternsRoot = join(__dirname, '..', 'src', 'data', 'architectural-patterns');

const categoryDirs = readdirSync(patternsRoot)
  .filter((entry) => statSync(join(patternsRoot, entry)).isDirectory());

const allData = [];
for (const category of categoryDirs) {
  const categoryDir = join(patternsRoot, category);
  const files = readdirSync(categoryDir).filter((f) => f.endsWith('.js'));
  for (const file of files) {
    const mod = await import(pathToFileURL(join(categoryDir, file)).href);
    const data = Object.values(mod)[0];
    allData.push({ file: `${category}/${file}`, data });
  }
}

const validSlugs = new Set(allData.map(({ data }) => data?.slug).filter(Boolean));

const REQUIRED_FIELDS = [
  'slug', 'name', 'popularity', 'intent', 'problem', 'solution', 'diagram',
  'steps', 'implementation', 'pros', 'cons', 'whenToUse',
  'realWorldExamples', 'relatedPatterns', 'quiz',
];

const BILINGUAL_TOP = ['name', 'intent', 'problem', 'solution'];
const ARRAY_OF_BILINGUAL = ['pros', 'cons', 'whenToUse', 'realWorldExamples'];

function checkBilingual(obj, label) {
  const errs = [];
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    errs.push(`${label} must be a { ru, en } object`);
    return errs;
  }
  if (typeof obj.ru !== 'string' || obj.ru.trim() === '') errs.push(`${label}.ru is empty or missing`);
  if (typeof obj.en !== 'string' || obj.en.trim() === '') errs.push(`${label}.en is empty or missing`);
  return errs;
}

let cleanFiles = 0;
let errorFiles = 0;

for (const { file, data } of allData) {
  const errs = [];

  for (const field of REQUIRED_FIELDS) {
    if (data[field] === undefined || data[field] === null) {
      errs.push(`missing required field: ${field}`);
    }
  }

  for (const field of BILINGUAL_TOP) {
    if (data[field] != null) errs.push(...checkBilingual(data[field], field));
  }

  if (data.diagram) {
    if (!['stack', 'pipeline', 'hub'].includes(data.diagram.layout)) {
      errs.push(`diagram.layout must be one of stack/pipeline/hub, got: ${JSON.stringify(data.diagram.layout)}`);
    }
    const nodeIds = new Set();
    if (Array.isArray(data.diagram.nodes)) {
      data.diagram.nodes.forEach((node, i) => {
        if (typeof node?.id !== 'string' || node.id === '') errs.push(`diagram.nodes[${i}].id is missing`);
        else nodeIds.add(node.id);
        errs.push(...checkBilingual(node?.label, `diagram.nodes[${i}].label`));
        errs.push(...checkBilingual(node?.role, `diagram.nodes[${i}].role`));
      });
    } else {
      errs.push('diagram.nodes must be an array');
    }
    if (Array.isArray(data.diagram.connections)) {
      data.diagram.connections.forEach((conn, i) => {
        if (!nodeIds.has(conn?.from)) errs.push(`diagram.connections[${i}].from: "${conn?.from}" is not a declared node id`);
        if (!nodeIds.has(conn?.to)) errs.push(`diagram.connections[${i}].to: "${conn?.to}" is not a declared node id`);
      });
    } else {
      errs.push('diagram.connections must be an array');
    }
  }

  if (Array.isArray(data.steps)) {
    data.steps.forEach((step, i) => {
      errs.push(...checkBilingual(step?.title, `steps[${i}].title`));
      errs.push(...checkBilingual(step?.explanation, `steps[${i}].explanation`));
    });
  }

  for (const field of ARRAY_OF_BILINGUAL) {
    if (Array.isArray(data[field])) {
      data[field].forEach((item, i) => errs.push(...checkBilingual(item, `${field}[${i}]`)));
    }
  }

  if (Array.isArray(data.relatedPatterns)) {
    data.relatedPatterns.forEach((slug, i) => {
      if (typeof slug !== 'string' || !validSlugs.has(slug)) {
        errs.push(`relatedPatterns[${i}]: "${slug}" is not a valid slug`);
      }
    });
  }

  if (Array.isArray(data.quiz)) {
    if (data.quiz.length !== 10) {
      errs.push(`quiz has ${data.quiz.length} questions, expected 10`);
    }

    data.quiz.forEach((q, qi) => {
      const qp = `quiz[${qi}]`;
      errs.push(...checkBilingual(q?.question, `${qp}.question`));

      if (!Array.isArray(q?.options)) {
        errs.push(`${qp}.options must be an array`);
      } else {
        if (q.options.length !== 4) {
          errs.push(`${qp}.options has ${q.options.length} items, expected 4`);
        }
        q.options.forEach((opt, oi) => errs.push(...checkBilingual(opt, `${qp}.options[${oi}]`)));
      }

      if (
        typeof q?.correct !== 'number' ||
        !Number.isInteger(q.correct) ||
        q.correct < 0 ||
        q.correct > 3
      ) {
        errs.push(`${qp}.correct must be an integer 0-3, got: ${JSON.stringify(q?.correct)}`);
      }

      errs.push(...checkBilingual(q?.explanation, `${qp}.explanation`));
      errs.push(...checkBilingual(q?.hint, `${qp}.hint`));

      if (
        Array.isArray(q?.options) &&
        q.options.length === 4 &&
        typeof q.correct === 'number' &&
        q.correct >= 0 &&
        q.correct <= 3
      ) {
        for (const lang of ['en', 'ru']) {
          const lens = q.options.map((o) => (typeof o?.[lang] === 'string' ? o[lang].length : 0));
          const correctLen = lens[q.correct];
          const maxOtherLen = Math.max(...lens.filter((_, idx) => idx !== q.correct));
          if (correctLen > maxOtherLen) {
            errs.push(`${qp}: length-tell - correct .${lang} (${correctLen}) is longer than all distractors (max ${maxOtherLen})`);
            break;
          }
        }
      }
    });
  }

  if (errs.length > 0) {
    errorFiles++;
    console.log(`\n${file}:`);
    for (const err of errs) console.log(`  ERROR: ${err}`);
  } else {
    cleanFiles++;
  }
}

console.log(`\n---`);
console.log(`Clean: ${cleanFiles} / ${allData.length}, Errors: ${errorFiles} / ${allData.length}`);

if (errorFiles > 0) process.exit(1);
