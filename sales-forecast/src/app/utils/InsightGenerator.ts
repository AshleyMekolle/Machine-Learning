export function generateInsights(actualSales: number[], predictedSales: number[]): string[] {
    const insights: string[] = []
  
    const averageActual = actualSales.reduce((sum, sale) => sum + sale, 0) / actualSales.length
    const averagePredicted = predictedSales.reduce((sum, sale) => sum + sale, 0) / predictedSales.length
    const growthRate = ((averagePredicted - averageActual) / averageActual) * 100
  
    // Overall trend insight
    if (growthRate > 0) {
      insights.push(
        `Sales are predicted to grow by ${growthRate.toFixed(2)}% over the next 30 days. Consider increasing inventory to meet potential demand.`,
      )
    } else if (growthRate < 0) {
      insights.push(
        `Sales are predicted to decline by ${Math.abs(growthRate).toFixed(2)}% over the next 30 days. Consider adjusting inventory and exploring new marketing strategies.`,
      )
    } else {
      insights.push(
        `Sales are predicted to remain stable over the next 30 days. Maintain current inventory levels and continue monitoring market trends.`,
      )
    }
  
    // Volatility insight
    const actualVolatility = calculateVolatility(actualSales)
    const predictedVolatility = calculateVolatility(predictedSales)
    if (predictedVolatility > actualVolatility * 1.2) {
      insights.push(
        `Sales volatility is expected to increase. Consider implementing flexible pricing strategies and maintaining safety stock.`,
      )
    } else if (predictedVolatility < actualVolatility * 0.8) {
      insights.push(
        `Sales volatility is expected to decrease. This may be a good time to optimize inventory levels and reduce safety stock.`,
      )
    }
  
    // Peak sales insight
    const maxPredicted = Math.max(...predictedSales)
    const maxPredictedDay = predictedSales.indexOf(maxPredicted) + 1
    insights.push(
      `The highest predicted sales day is day ${maxPredictedDay} with $${maxPredicted.toFixed(2)}. Plan promotions and ensure sufficient inventory for this peak.`,
    )
  
    // Minimum sales insight
    const minPredicted = Math.min(...predictedSales)
    const minPredictedDay = predictedSales.indexOf(minPredicted) + 1
    insights.push(
      `The lowest predicted sales day is day ${minPredictedDay} with $${minPredicted.toFixed(2)}. Consider running promotions or events to boost sales on slower days.`,
    )
  
    return insights
  }
  
  function calculateVolatility(sales: number[]): number {
    const mean = sales.reduce((sum, sale) => sum + sale, 0) / sales.length
    const squaredDifferences = sales.map((sale) => Math.pow(sale - mean, 2))
    const variance = squaredDifferences.reduce((sum, diff) => sum + diff, 0) / sales.length
    return Math.sqrt(variance)
  }
  
  