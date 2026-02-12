const fs = require('fs');
const path = require('path');

// Paths to the generated files
const devPath = path.join(__dirname, '..', 'dist', 'dev', 'App.js');
const prodPath = path.join(__dirname, '..', 'dist', 'prod', 'App.js');

// Read the content of both files
const devContent = fs.readFileSync(devPath, 'utf8');
const prodContent = fs.readFileSync(prodPath, 'utf8');

// Count occurrences of data-testid in each file
const countDataTestId = (content) => {
  const regex = /data-testid/g;
  const matches = content.match(regex);
  return matches ? matches.length : 0;
};

const devCount = countDataTestId(devContent);
const prodCount = countDataTestId(prodContent);

console.log('\n=== TEST-ID REMOVAL COMPARISON ===\n');
console.log(`DEVELOPMENT BUILD: ${devCount} data-testid attributes found`);
console.log(`PRODUCTION BUILD: ${prodCount} data-testid attributes found`);
console.log('\n=== DEVELOPMENT VERSION (with test IDs) ===\n');
console.log(devContent.slice(0, 500) + '...\n');
console.log('\n=== PRODUCTION VERSION (without test IDs) ===\n');
console.log(prodContent.slice(0, 500) + '...\n');

if (prodCount === 0 && devCount > 0) {
  console.log('✅ SUCCESS: All data-testid attributes were removed from the production build!');
} else if (prodCount < devCount) {
  console.log('⚠️ WARNING: Some data-testid attributes were removed, but not all of them.');
} else {
  console.log('❌ ERROR: No data-testid attributes were removed from the production build.');
}
