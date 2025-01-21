import { useState } from 'react'
import { Upload } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { processData } from '../utils/processData'

interface FileUploadProps {
  onFileUpload: (data: { dates: string[], sales: number[] }) => void
}

export function FileUpload({ onFileUpload }: FileUploadProps) {
  const [fileName, setFileName] = useState<string | null>(null)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFileName(file.name)
      const text = await file.text()
      const { dates, sales } = processData(text)
      onFileUpload({ dates, sales })
    }
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Upload CSV</Label>
      <Input
        id="picture"
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="hidden"
      />
      <Button asChild className="w-full">
        <label htmlFor="picture" className="cursor-pointer">
          <Upload className="mr-2 h-4 w-4" />
          {fileName ? fileName : 'Upload CSV'}
        </label>
      </Button>
    </div>
  )
}

