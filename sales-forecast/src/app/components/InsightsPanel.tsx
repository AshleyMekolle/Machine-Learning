import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface InsightsPanelProps {
  insights: string[]
}

export function InsightsPanel({ insights }: InsightsPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-2">
          {insights.map((insight, index) => (
            <li key={index}>{insight}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

