import { Button } from "./ui/button"
import { Download } from "lucide-react"

interface ExportButtonProps {
  data: {
    actualSales: number[]
    predictedSales: number[]
    insights: string[]
  }
}

export function ExportButton({ data }: ExportButtonProps) {
  const handleExport = () => {
    const { actualSales, predictedSales, insights } = data

    let csvContent = "data:text/csv;charset=utf-8,"
    csvContent += "Day,Actual Sales,Predicted Sales\n"

    for (let i = 0; i < actualSales.length; i++) {
      csvContent += `${i + 1},${actualSales[i]},${predictedSales[i] || ""}\n`
    }

    for (let i = actualSales.length; i < predictedSales.length; i++) {
      csvContent += `${i + 1},,${predictedSales[i]}\n`
    }

    csvContent += "\nInsights:\n"
    insights.forEach((insight) => {
      csvContent += `${insight}\n`
    })

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "sales_forecast_results.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Button onClick={handleExport}>
      <Download className="mr-2 h-4 w-4" />
      Export Results
    </Button>
  )
}

