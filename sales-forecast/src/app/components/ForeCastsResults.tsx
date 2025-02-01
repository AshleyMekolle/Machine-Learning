import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

interface ForecastResultsProps {
  actualSales: number[]
  predictedSales: number[]
}

export function ForecastResults({ actualSales, predictedSales }: ForecastResultsProps) {
  const averageActualSales = actualSales.reduce((sum, sale) => sum + sale, 0) / actualSales.length
  const averagePredictedSales = predictedSales.reduce((sum, sale) => sum + sale, 0) / predictedSales.length
  const growthRate = ((averagePredictedSales - averageActualSales) / averageActualSales) * 100

  const totalActualSales = actualSales.reduce((sum, sale) => sum + sale, 0)
  const totalPredictedSales = predictedSales.reduce((sum, sale) => sum + sale, 0)
  const salesDifference = totalPredictedSales - totalActualSales

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Actual Sales (30 days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${averageActualSales.toFixed(2)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Predicted Sales (Next 30 days)</CardTitle>
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
          <CardTitle className="text-sm font-medium">Total Actual Sales (30 days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalActualSales.toFixed(2)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Predicted Sales (Next 30 days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalPredictedSales.toFixed(2)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Predicted Sales Difference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold" style={{ color: salesDifference >= 0 ? "green" : "red" }}>
            {salesDifference >= 0 ? "+" : "-"}${Math.abs(salesDifference).toFixed(2)}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

