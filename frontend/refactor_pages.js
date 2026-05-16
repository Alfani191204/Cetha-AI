const fs = require('fs');
const path = require('path');

const pages = [
  'app/page.tsx',
  'app/scan/page.tsx',
  'app/insight/page.tsx',
  'app/inventory/page.tsx',
  'app/profile/page.tsx',
  'app/transactions/page.tsx',
  'app/notifications/page.tsx',
  'app/chat/page.tsx',
  'app/health/page.tsx',
  'app/help/page.tsx',
  'app/report/page.tsx',
  'app/target/page.tsx'
];

pages.forEach(page => {
  const fullPath = path.join(__dirname, page);
  if (!fs.existsSync(fullPath)) {
    console.log(`Skip: ${page} not found`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');

  // 1. Add Import
  if (!content.includes('PageWrapper')) {
    content = content.replace(
      /import {/, 
      `import PageWrapper from "@/components/PageWrapper";\nimport {`
    );
  }

  // 2. Remove hardcoded classes
  content = content.replace(/mx-auto/g, '');
  content = content.replace(/max-w-\[430px\]/g, '');
  content = content.replace(/min-h-\[100dvh\]/g, '');
  content = content.replace(/min-h-screen/g, '');
  content = content.replace(/h-\[100dvh\]/g, '');
  
  // Be careful with px-6, pb-*, absolute, fixed
  // We only replace them if they are in className strings.
  // Actually, let's just do targeted replacements for the outer containers.
  
  // 3. Wrap with PageWrapper
  // Find the first `return (`
  if (!content.includes('<PageWrapper>')) {
    const returnRegex = /return\s*\(\s*(<div|<main)([^>]*>)/;
    const match = content.match(returnRegex);
    if (match) {
      // Replace outer container classes if it's the main wrapper
      let outerClasses = match[2];
      outerClasses = outerClasses.replace(/fixed/g, '');
      outerClasses = outerClasses.replace(/absolute/g, '');
      outerClasses = outerClasses.replace(/pb-\d+/g, '');
      outerClasses = outerClasses.replace(/px-\d+/g, '');
      outerClasses = outerClasses.replace(/overflow-\w+/g, '');
      
      content = content.replace(
        returnRegex, 
        `return (\n    <PageWrapper>\n      $1${outerClasses}`
      );
      
      // Close PageWrapper
      content = content.replace(
        /(<\/div>|<\/main>)\s*\);\s*}\s*$/, 
        `$1\n    </PageWrapper>\n  );\n}`
      );
    }
  }

  fs.writeFileSync(fullPath, content);
  console.log(`Updated ${page}`);
});
