const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'app');

function traverseAndReplace(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      traverseAndReplace(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;

      content = content.replace(/#6E1535/g, 'var(--primary)');
      content = content.replace(/#F0A347/g, 'var(--secondary)');

      if (content !== original) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${fullPath}`);
      }
    }
  });
}

traverseAndReplace(targetDir);
console.log("Brand colors replaced!");
