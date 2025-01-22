"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "../app/components/ui/card"
import { Input } from "../app/components/ui/input"
import { Button } from "../app/components/ui/button"
import { Label } from "../app/components/ui/label"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { BarChart, Bar } from "recharts"
import { AlertCircle, DollarSign, Home, TrendingUp } from "lucide-react"

const PredictionDashboard = () => {
  const [formData, setFormData] = useState({
    OverallQual: "7",
    GrLivArea: "1500",
    GarageCars: "2",
    GarageArea: "400",
    TotalBsmtSF: "1000",
    "1stFlrSF": "1000",
    FullBath: "2",
    TotRmsAbvGrd: "6",
    YearBuilt: "1990",
    YearRemodAdd: "2000",
    Fireplaces: "1",
    BsmtFinSF1: "500",
  })

  const [prediction, setPrediction] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [featureImportance, setFeatureImportance] = useState([])
  const [priceHistory, setPriceHistory] = useState<Array<{ timestamp: string; price: number }>>([])

  useEffect(() => {
    fetch("/api/feature-importance")
      .then((res) => res.json())
      .then((data) => setFeatureImportance(data))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features: Object.values(formData).map(Number) }),
      })

      const data = await response.json()
      setPrediction(data.prediction)

      setPriceHistory((prev) =>
        [
          ...prev,
          {
            timestamp: new Date().toLocaleTimeString(),
            price: data.prediction,
          },
        ].slice(-10),
      )
    } catch (error) {
      console.error("Prediction error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-6 w-6" />
              House Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              {Object.entries(formData).map(([key, value]) => (
                <div key={key}>
                  <Label htmlFor={key}>{key}</Label>
                  <Input
                    id={key}
                    name={key}
                    type="number"
                    value={value}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                    className="mt-1"
                    required
                  />
                </div>
              ))}
              <Button type="submit" className="col-span-2 mt-4" disabled={loading}>
                {loading ? "Calculating..." : "Predict Price"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Prediction Result */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-6 w-6" />
              Prediction Result
            </CardTitle>
          </CardHeader>
          <CardContent>
            {prediction && (
              <div className="space-y-4">
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <p className="text-3xl font-bold text-green-700">${prediction.toLocaleString()}</p>
                  <p className="text-sm text-green-600 mt-2">Estimated Price</p>
                </div>

                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={priceHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="timestamp" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="price" stroke="#4ade80" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Feature Importance Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6" />
            Feature Importance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={featureImportance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="feature" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="importance" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Model Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-6 w-6" />
            Model Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-lg font-semibold">Model Type</p>
              <p className="text-sm">Random Forest Regressor</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-lg font-semibold">R² Score</p>
              <p className="text-sm">0.892</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-lg font-semibold">RMSE</p>
              <p className="text-sm">$24,563</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PredictionDashboard

