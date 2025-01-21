'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../app/components/ui/table"
import { Input } from "../app/components/ui/input"

const recentPredictions = [
  { id: 1, date: '2023-07-01', economicIndex: 105, marketSentiment: 'Positive', competitorPrice: 52, predictedPrice: '$105.23', actualPrice: '$104.98' },
  { id: 2, date: '2023-07-02', economicIndex: 103, marketSentiment: 'Neutral', competitorPrice: 51, predictedPrice: '$106.45', actualPrice: '$106.72' },
  { id: 3, date: '2023-07-03', economicIndex: 107, marketSentiment: 'Positive', competitorPrice: 53, predictedPrice: '$107.10', actualPrice: 'N/A' },
]

export default function RecentPredictions() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPredictions = recentPredictions.filter(prediction =>
    prediction.date.includes(searchTerm) ||
    prediction.economicIndex.toString().includes(searchTerm) ||
    prediction.marketSentiment.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prediction.competitorPrice.toString().includes(searchTerm) ||
    prediction.predictedPrice.includes(searchTerm) ||
    prediction.actualPrice.includes(searchTerm)
  )

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search predictions..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Table>
        <TableCaption>A list of your recent predictions</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Economic Index</TableHead>
            <TableHead>Market Sentiment</TableHead>
            <TableHead>Competitor Price</TableHead>
            <TableHead>Predicted Price</TableHead>
            <TableHead>Actual Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPredictions.map((prediction) => (
            <TableRow key={prediction.id}>
              <TableCell>{prediction.date}</TableCell>
              <TableCell>{prediction.economicIndex}</TableCell>
              <TableCell>{prediction.marketSentiment}</TableCell>
              <TableCell>${prediction.competitorPrice.toFixed(2)}</TableCell>
              <TableCell>{prediction.predictedPrice}</TableCell>
              <TableCell>{prediction.actualPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

