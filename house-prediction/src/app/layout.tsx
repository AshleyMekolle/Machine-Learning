import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "../app/lib/utils"
import Link from "next/link"
import { Home, BarChart2, Info } from "lucide-react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "House Price Prediction App",
  description: "Predict house prices using machine learning",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <div className="flex flex-col min-h-screen">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
              <Link href="/" className="flex items-center space-x-2">
                <Home className="h-6 w-6" />
                <span className="font-bold">House Price Predictor</span>
              </Link>
              <nav className="ml-auto flex items-center space-x-4 text-sm font-medium">
                <Link href="/predict" className="flex items-center">
                  <BarChart2 className="mr-2 h-4 w-4" />
                  Predict
                </Link>
                <Link href="/about" className="flex items-center">
                  <Info className="mr-2 h-4 w-4" />
                  About
                </Link>
              </nav>
            </div>
          </header>
          <main className="flex-1 container py-6">{children}</main>
          <footer className="border-t py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                Built with Next.js and Machine Learning. © 2024 House Price Predictor
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}

