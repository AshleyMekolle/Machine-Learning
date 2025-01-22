import { type NextRequest, NextResponse } from "next/server"
import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { features } = body

    const featuresString = features.join(",")
    const { stdout, stderr } = await execAsync(`python lib/predict.py ${featuresString}`)

    if (stderr) {
      console.error("Prediction error:", stderr)
      return NextResponse.json({ error: "Failed to make prediction" }, { status: 500 })
    }

    const prediction = Number.parseFloat(stdout)
    return NextResponse.json({ prediction })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

