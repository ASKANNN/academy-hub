import { readdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sortingDir = join(__dirname, '..', 'src', 'data', 'algorithms', 'sorting');

const files = readdirSync(sortingDir).filter((f) => f.endsWith('.js'));

let totalFlagged = 0;
let totalQuestions = 0;
const rows = [];

for (const file of files) {
  const mod = await import(pathToFileURL(join(sortingDir, file)).href);
  const data = Object.values(mod)[0];
  const quiz = data.quiz || [];
  let flagged = 0;

  quiz.forEach((item) => {
    const lens = item.options.map((o) => o.en.length);
    const correctLen = lens[item.correct];
    const maxOther = Math.max(...lens.filter((_, idx) => idx !== item.correct));
    if (correctLen > maxOther) flagged++;
  });

  totalFlagged += flagged;
  totalQuestions += quiz.length;
  rows.push({ file, flagged, total: quiz.length });
}

rows.sort((a, b) => b.flagged - a.flagged);
for (const r of rows) {
  console.log(`${r.file.padEnd(28)} ${r.flagged}/${r.total}`);
}
console.log('---');
console.log(`TOTAL FLAGGED: ${totalFlagged}/${totalQuestions}`);
