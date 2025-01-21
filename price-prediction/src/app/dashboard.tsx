'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../app/components/ui/card'
import { Button } from '../app/components/ui/button'
import { Input } from '../app/components/ui/input'
import { Label } from '../app/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../app/components/ui/select'
import PredictionChart from '../app/prediction_chart'
import RecentPredictions from '../app/recent-predictions'
import AnalysisPage from '../app/analysis_page'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../app/components/ui/tabs'

export default function Dashboard() {
  const [inputData, setInputData] = useState({
    economicIndex: '',
    marketSentiment: '',
    competitorPrice: ''
  })
  const [loading, setLoading] = useState(false)

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Here you would typically call your ML API
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulating API call
    setLoading(false)
    // Update chart and table data here
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-200">ML Price Prediction Platform</h1>
      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Price Prediction Chart</CardTitle>
                <CardDescription>Visualize price trends and predictions</CardDescription>
              </CardHeader>
              <CardContent>
                <PredictionChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Make a Prediction</CardTitle>
                <CardDescription>Enter data to predict future prices</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePredict} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="economicIndex">Economic Index</Label>
                    <Input
                      id="economicIndex"
                      placeholder="Enter economic index"
                      value={inputData.economicIndex}
                      onChange={(e) => setInputData({...inputData, economicIndex: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="marketSentiment">Market Sentiment</Label>
                    <Select onValueChange={(value: string) => setInputData({...inputData, marketSentiment: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select market sentiment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="negative">Negative</SelectItem>
                        <SelectItem value="neutral">Neutral</SelectItem>
                        <SelectItem value="positive">Positive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="competitorPrice">Competitor Price</Label>
                    <Input
                      id="competitorPrice"
                      placeholder="Enter competitor price"
                      value={inputData.competitorPrice}
                      onChange={(e) => setInputData({...inputData, competitorPrice: e.target.value})}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Predicting...' : 'Predict'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="predictions">
          <Card>
            <CardHeader>
              <CardTitle>Recent Predictions</CardTitle>
              <CardDescription>View your latest price predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentPredictions />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analysis">
          <AnalysisPage />
        </TabsContent>
      </Tabs>
    </div>
  )
}

