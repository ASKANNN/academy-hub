import { readdirSync, statSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const algorithmsRoot = join(__dirname, '..', 'src', 'data', 'algorithms');

const categoryDirs = readdirSync(algorithmsRoot)
  .filter((entry) => statSync(join(algorithmsRoot, entry)).isDirectory());

let totalFlagged = 0;
let totalQuestions = 0;
const rows = [];

for (const category of categoryDirs) {
  const categoryDir = join(algorithmsRoot, category);
  const files = readdirSync(categoryDir).filter((f) => f.endsWith('.js'));

  for (const file of files) {
    const mod = await import(pathToFileURL(join(categoryDir, file)).href);
    const data = Object.values(mod)[0];
    const quiz = data.quiz || [];
    let flagged = 0;

    quiz.forEach((item) => {
      for (const lang of ['en', 'ru']) {
        const lens = item.options.map((o) => o[lang].length);
        const correctLen = lens[item.correct];
        const maxOther = Math.max(...lens.filter((_, idx) => idx !== item.correct));
        if (correctLen > maxOther) { flagged++; break; }
      }
    });

    totalFlagged += flagged;
    totalQuestions += quiz.length;
    rows.push({ file: `${category}/${file}`, flagged, total: quiz.length });
  }
}

rows.sort((a, b) => b.flagged - a.flagged);
for (const r of rows) {
  console.log(`${r.file.padEnd(28)} ${r.flagged}/${r.total}`);
}
console.log('---');
console.log(`TOTAL FLAGGED: ${totalFlagged}/${totalQuestions}`);
