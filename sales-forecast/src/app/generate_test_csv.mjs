import { writeFileSync } from 'fs';

function generateSteadyGrowthData() {
  let data = 'Date,Sales\n';
  let currentDate = new Date('2023-01-01');
  let sales = 1000;

  for (let i = 0; i < 90; i++) {
    data += `${currentDate.toISOString().split('T')[0]},${sales.toFixed(2)}\n`;
    currentDate.setDate(currentDate.getDate() + 1);
    sales *= 1.01; // 1% daily growth
  }

  writeFileSync('steady_growth_sales.csv', data);
  console.log('steady_growth_sales.csv has been generated.');
}

function generateFluctuatingData() {
  let data = 'Date,Sales\n';
  let currentDate = new Date('2023-01-01');
  let sales = 1000;

  for (let i = 0; i < 90; i++) {
    data += `${currentDate.toISOString().split('T')[0]},${sales.toFixed(2)}\n`;
    currentDate.setDate(currentDate.getDate() + 1);
    sales *= 1 + (Math.random() * 0.06 - 0.03); // Random fluctuation between -3% and 3%
  }

  writeFileSync('fluctuating_sales.csv', data);
  console.log('fluctuating_sales.csv has been generated.');
}

generateSteadyGrowthData();
generateFluctuatingData();

console.log('Test CSV files have been generated successfully.');