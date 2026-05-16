const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'app/scan/page.tsx',
  'app/insight/page.tsx',
  'app/inventory/page.tsx',
  'app/profile/page.tsx',
  'app/transactions/page.tsx',
  'app/notifications/page.tsx'
];

filesToUpdate.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Add import if not exists
    if (!content.includes('import { BottomNav }')) {
      content = content.replace(
        /import {/, 
        `import { BottomNav } from "@/components/BottomNav";\nimport {`
      );
    }
    
    // Add <BottomNav /> before the last </div> if not exists
    // (scan/page.tsx already has it from the previous multi_replace, so we skip if it exists)
    if (!content.includes('<BottomNav />')) {
      const match = content.match(/(.*)(<\/div>\s*);\s*}$/s);
      if (match) {
        content = content.replace(
          /(.*)(<\/div>\s*);\s*}$/s, 
          `$1  <BottomNav />\n    $2);\n}`
        );
      }
    }

    fs.writeFileSync(fullPath, content);
    console.log(`Updated ${file}`);
  }
});
