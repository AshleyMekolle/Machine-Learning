import { writeFileSync } from 'fs';

function generateTestData(fileName, trendType) {
  let data = 'Date,Sales\n';
  let currentDate = new Date('2023-01-01');
  let sales = 1000;

  for (let i = 0; i < 90; i++) {
    data += `${currentDate.toISOString().split('T')[0]},${sales.toFixed(2)}\n`;
    currentDate.setDate(currentDate.getDate() + 1);

    switch (trendType) {
      case 'steady_growth':
        sales *= 1.01; // 1% daily growth
        break;
      case 'seasonal':
        sales *= 1 + 0.1 * Math.sin(i / 30 * Math.PI); // Seasonal fluctuation
        break;
      case 'volatile':
        sales *= 1 + (Math.random() * 0.2 - 0.1); // Random fluctuation between -10% and 10%
        break;
    }
  }

  writeFileSync(fileName, data);
  console.log(`${fileName} has been generated.`);
}

generateTestData('steady_growth_sales.csv', 'steady_growth');
generateTestData('seasonal_sales.csv', 'seasonal');
generateTestData('volatile_sales.csv', 'volatile');

console.log('Test CSV files have been generated successfully.');