const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'node_modules/@balkangraph/familytree.js/familytree.d.ts');

try {
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('chartInstance: OrgChart')) {
    const patched = content.replace('chartInstance: OrgChart', 'chartInstance: any');
    fs.writeFileSync(filePath, patched, 'utf8');
    console.log('✅ Patched familytree.d.ts to fix OrgChart error');
  } else {
    console.log('ℹ️ Patch not needed');
  }
} catch (err) {
  console.error('❌ Failed to patch familytree.d.ts:', err.message);
}
