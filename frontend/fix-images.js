const fs = require('fs');
const glob = require('glob');
const files = glob.sync('c:/Desktop/sujatafinejewels/frontend/src/components/**/*.tsx');
let fixedFiles = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  
  content = content.replace(/<Image([^>]*?)fill([^>]*?)(?!sizes)([^>]*?)\/?>/g, (match, p1, p2, p3) => {
    if (match.includes('sizes=')) return match;
    return match.replace('fill', 'fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"');
  });

  if (content !== original) {
    fs.writeFileSync(file, content);
    fixedFiles++;
    console.log('Fixed:', file);
  }
}
console.log('Total fixed:', fixedFiles);
