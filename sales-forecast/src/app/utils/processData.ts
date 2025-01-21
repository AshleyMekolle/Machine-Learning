export function processData(csv: string): { dates: string[], sales: number[] } {
    const lines = csv.split('\n')
    const dates: string[] = []
    const sales: number[] = []
  
    for (let i = 1; i < lines.length; i++) {
      const [date, sale] = lines[i].split(',')
      if (date && sale) {
        dates.push(date.trim())
        sales.push(parseFloat(sale.trim()))
      }
    }
  
    return { dates, sales }
  }
  
  