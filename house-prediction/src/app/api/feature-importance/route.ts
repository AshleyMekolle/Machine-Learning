import { NextResponse } from "next/server"
import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)

export async function GET() {
  try {
    const { stdout, stderr } = await execAsync("python lib/get_feature_importance.py")

    if (stderr) {
      console.error("Error fetching feature importance:", stderr)
      return NextResponse.json({ error: "Failed to fetch feature importance" }, { status: 500 })
    }

    const featureImportance = JSON.parse(stdout)
    return NextResponse.json(featureImportance)
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

