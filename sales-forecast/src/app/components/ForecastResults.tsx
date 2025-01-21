import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

interface ForecastResultsProps {
  actualSales: number[]
  predictedSales: number[]
}

export function ForecastResults({ actualSales, predictedSales }: ForecastResultsProps) {
  const averageActualSales = actualSales.reduce((sum, sale) => sum + sale, 0) / actualSales.length
  const averagePredictedSales = predictedSales.reduce((sum, sale) => sum + sale, 0) / predictedSales.length
  const growthRate = ((averagePredictedSales - averageActualSales) / averageActualSales) * 100

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Actual Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${averageActualSales.toFixed(2)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Predicted Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${averagePredictedSales.toFixed(2)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Predicted Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{growthRate.toFixed(2)}%</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Forecast Period</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">30 days</div>
        </CardContent>
      </Card>
    </div>
  )
}

