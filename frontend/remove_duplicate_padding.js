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
  if (!fs.existsSync(fullPath)) return;

  let content = fs.readFileSync(fullPath, 'utf8');

  // Replace standalone px-6, but preserve -mx-6 px-6 if it exists
  // First, temporarily protect -mx-6 px-6
  content = content.replace(/-mx-6 px-6/g, '__PROTECTED_EDGE__');
  
  // Also protect PageWrapper import and usage if needed (it doesn't have px-6 text, just the component name)
  
  // Remove px-6
  content = content.replace(/\bpx-6\b/g, '');
  
  // Clean up double spaces created by removal
  content = content.replace(/  +/g, ' ');
  // Clean up empty className strings if any `className=" "`
  content = content.replace(/className="\s+"/g, 'className=""');

  // Restore protected edges
  content = content.replace(/__PROTECTED_EDGE__/g, '-mx-6 px-6');

  // Fix the horizontal scroll on page.tsx specifically
  if (page === 'app/page.tsx') {
    content = content.replace(
      /className=" flex gap-4 overflow-x-auto/,
      'className="-mx-6 px-6 flex gap-4 overflow-x-auto'
    );
  }

  fs.writeFileSync(fullPath, content);
  console.log(`Cleaned padding in ${page}`);
});
