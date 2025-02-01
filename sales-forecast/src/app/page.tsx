"use client"

import { useState } from "react"
import { FileUpload } from "../app/components/FileUpload"
import { ForecastChart } from "../app/components/ForeCastChart"
import { ForecastResults } from "../app/components/ForecastResults"
import { InsightsPanel } from "../app/components/InsightsPanel"
import { ExportButton } from "../app/components/ExportButton"
import { Button } from "../app/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../app/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../app/components/ui/select"
import { trainLinearRegressionModel, predictSales } from "../app/utils/linearRegression"
import { generateInsights } from "../app/utils/InsightGenerator"

export default function Home() {
  const [data, setData] = useState<{ dates: string[]; sales: number[] } | null>(null)
  const [predictions, setPredictions] = useState<number[] | null>(null)
  const [insights, setInsights] = useState<string[]>([])
  const [forecastPeriod, setForecastPeriod] = useState(30)

  const handleFileUpload = (uploadedData: { dates: string[]; sales: number[] }) => {
    setData(uploadedData)
    setPredictions(null)
    setInsights([])
  }

  const handleForecast = async () => {
    if (data) {
      const model = await trainLinearRegressionModel(data.dates, data.sales)
      const forecastDates = [
        ...data.dates,
        ...Array(forecastPeriod)
          .fill(0)
          .map((_, i) => (data.dates.length + i).toString()),
      ]
      const forecastedSales = predictSales(model, forecastDates)
      setPredictions(forecastedSales)

      const generatedInsights = generateInsights(data.sales, forecastedSales.slice(-forecastPeriod))
      setInsights(generatedInsights)
    }
  }

  const handleForecastPeriodChange = (value: string) => {
    setForecastPeriod(Number.parseInt(value))
    setPredictions(null)
    setInsights([])
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Sales Trend Predictor</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Upload Sales Data</CardTitle>
          <CardDescription>Upload a CSV file with your historical sales data</CardDescription>
        </CardHeader>
        <CardContent>
          <FileUpload onFileUpload={handleFileUpload} />
        </CardContent>
      </Card>

      {data && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Generate Forecast</CardTitle>
            <CardDescription>Select forecast period and generate insights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <label htmlFor="forecast-period" className="text-sm font-medium">
                Forecast Period:
              </label>
              <Select onValueChange={handleForecastPeriodChange} defaultValue="30">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="60">60 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleForecast}>Generate Forecast and Insights</Button>
          </CardContent>
        </Card>
      )}

      {predictions && (
        <>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Sales Forecast Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <ForecastChart
                dates={[
                  ...data!.dates,
                  ...Array(forecastPeriod)
                    .fill(0)
                    .map((_, i) => `Future ${i + 1}`),
                ]}
                actualSales={[...data!.sales, ...Array(forecastPeriod).fill(null)]}
                predictedSales={predictions}
              />
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Forecast Results</CardTitle>
            </CardHeader>
            <CardContent>
              <ForecastResults actualSales={data!.sales} predictedSales={predictions.slice(-forecastPeriod)} />
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Business Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <InsightsPanel insights={insights} />
            </CardContent>
          </Card>

          <ExportButton
            data={{
              actualSales: data!.sales,
              predictedSales: predictions.slice(-forecastPeriod),
              insights: insights,
            }}
          />
        </>
      )}
    </div>
  )
}

