'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../app/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../app/components/ui/select'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

const trendData = [
  { month: 'Jan', price: 100 },
  { month: 'Feb', price: 120 },
  { month: 'Mar', price: 115 },
  { month: 'Apr', price: 130 },
  { month: 'May', price: 140 },
  { month: 'Jun', price: 135 },
]

const factorImpact = [
  { name: 'Economic Index', impact: 40 },
  { name: 'Market Sentiment', impact: 30 },
  { name: 'Competitor Price', impact: 20 },
  { name: 'Other Factors', impact: 10 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const predictionAccuracy = [
  { month: 'Jan', accuracy: 92 },
  { month: 'Feb', accuracy: 88 },
  { month: 'Mar', accuracy: 95 },
  { month: 'Apr', accuracy: 91 },
  { month: 'May', accuracy: 93 },
  { month: 'Jun', accuracy: 89 },
]

export default function AnalysisPage() {
  const [timeRange, setTimeRange] = useState('6M')

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Market Analysis</h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1M">1 Month</SelectItem>
            <SelectItem value="3M">3 Months</SelectItem>
            <SelectItem value="6M">6 Months</SelectItem>
            <SelectItem value="1Y">1 Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Price Trend</CardTitle>
            <CardDescription>Historical price trends over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Factor Impact</CardTitle>
            <CardDescription>Relative impact of different factors on price</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={factorImpact}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="impact"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {factorImpact.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prediction Accuracy</CardTitle>
            <CardDescription>Model accuracy over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={predictionAccuracy}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="accuracy" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
            <CardDescription>Important takeaways for decision making</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Prices have shown an overall upward trend over the past 6 months.</li>
              <li>Economic index has the highest impact on price fluctuations.</li>
              <li>The prediction model maintains an average accuracy of 91%.</li>
              <li>Market sentiment has become increasingly important in recent months.</li>
              <li>Consider adjusting pricing strategy in response to competitor price changes.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

