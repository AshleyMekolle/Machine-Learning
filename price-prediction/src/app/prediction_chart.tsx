'use client'

import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../app/components/ui/select'

const data = [
  { date: '2023-01', actual: 4000, predicted: 4100 },
  { date: '2023-02', actual: 3000, predicted: 3200 },
  { date: '2023-03', actual: 2000, predicted: 2400 },
  { date: '2023-04', actual: 2780, predicted: 2600 },
  { date: '2023-05', actual: 1890, predicted: 2100 },
  { date: '2023-06', actual: 2390, predicted: 2500 },
  { date: '2023-07', actual: 3490, predicted: 3200 },
]

export default function PredictionChart() {
  const [timeRange, setTimeRange] = useState('1M')

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
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
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="actual" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="predicted" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

