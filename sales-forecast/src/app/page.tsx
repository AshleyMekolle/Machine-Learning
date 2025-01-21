'use client'

import { useState } from 'react'
import { FileUpload } from '../app/components/FileUpload'
import { ForecastChart } from '../app/components/ForeCastChart'
import { ForecastResults } from '../app/components/ForecastResults'
import { Button } from '../app/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../app/components/ui/card'
import { trainLinearRegressionModel, predictSales } from '../app/utils/linearRegression'

export default function Home() {
  const [data, setData] = useState<{ dates: string[], sales: number[] } | null>(null)
  const [predictions, setPredictions] = useState<number[] | null>(null)

  const handleFileUpload = (uploadedData: { dates: string[], sales: number[] }) => {
    setData(uploadedData)
    setPredictions(null)
  }

  const handleForecast = async () => {
    if (data) {
      const model = await trainLinearRegressionModel(data.dates, data.sales)
      const forecastDates = [...data.dates, ...Array(30).fill(0).map((_, i) => data.dates.length + i)]
      const forecastedSales = predictSales(model, forecastDates)
      setPredictions(forecastedSales)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Sales Data</CardTitle>
          <CardDescription>Upload a CSV file with your historical sales data</CardDescription>
        </CardHeader>
        <CardContent>
          <FileUpload onFileUpload={handleFileUpload} />
        </CardContent>
      </Card>

      {data && (
        <Card>
          <CardHeader>
            <CardTitle>Generate Forecast</CardTitle>
            <CardDescription>Click to generate a 30-day sales forecast</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleForecast}>Generate Forecast</Button>
          </CardContent>
        </Card>
      )}

      {predictions && (
        <>
          <ForecastChart
            dates={[...data!.dates, ...Array(30).fill(0).map((_, i) => `Future ${i + 1}`)]}
            actualSales={[...data!.sales, ...Array(30).fill(null)]}
            predictedSales={predictions}
          />
          <ForecastResults actualSales={data!.sales} predictedSales={predictions.slice(-30)} />
        </>
      )}
    </div>
  )
}

