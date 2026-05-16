const fs = require('fs');
const path = require('path');

const config = {
  'app/insight/page.tsx': { title: 'Smart Insight', subtitle: 'Analisis otomatis keuanganmu' },
  'app/inventory/page.tsx': { title: 'Saran Stok', subtitle: 'Rekomendasi berbasis data historis' },
  'app/scan/page.tsx': { title: 'Scan Nota', subtitle: 'Foto atau upload nota belanjamu' },
  'app/transactions/page.tsx': { title: 'Semua Transaksi' },
  'app/notifications/page.tsx': { title: 'Notifikasi' },
  'app/health/page.tsx': { title: 'Detail Kesehatan Keuangan' },
  'app/help/page.tsx': { title: 'Bantuan' },
  'app/report/page.tsx': { title: 'Laporan Keuangan' },
  'app/target/page.tsx': { title: 'Target Keuangan' }
};

for (const [pagePath, headerData] of Object.entries(config)) {
  const fullPath = path.join(__dirname, pagePath);
  if (!fs.existsSync(fullPath)) continue;

  let content = fs.readFileSync(fullPath, 'utf8');

  // Add import
  if (!content.includes('PageHeader')) {
    content = content.replace(/import PageWrapper from "[^"]+";/, `import PageWrapper from "@/components/PageWrapper";\nimport PageHeader from "@/components/PageHeader";`);
  }

  // Add px-5 to outer container
  // E.g. <div className=" bg-[var(--bg)]..." -> <div className="px-5 bg-[var(--bg)]..."
  // Wait, some might already have px-5. Let's just blindly add it right after <PageWrapper>
  content = content.replace(/<PageWrapper>\s*<div className="([^"]*)"/, (match, classes) => {
    if (!classes.includes('px-5')) {
      return `<PageWrapper>\n  <div className="px-5 ${classes}"`;
    }
    return match;
  });

  // Replace existing header
  // Find <header> ... </header> block
  const subtitleProp = headerData.subtitle ? ` subtitle="${headerData.subtitle}"` : '';
  const newHeader = `<PageHeader title="${headerData.title}"${subtitleProp} />`;
  
  // Regex to remove <header>...</header>
  content = content.replace(/<header[\s\S]*?<\/header>/, newHeader);

  // Change space-y-5 or space-y-6 to space-y-4
  content = content.replace(/space-y-5/g, 'space-y-4');
  content = content.replace(/space-y-6/g, 'space-y-4');

  fs.writeFileSync(fullPath, content);
  console.log(`Updated ${pagePath}`);
}
