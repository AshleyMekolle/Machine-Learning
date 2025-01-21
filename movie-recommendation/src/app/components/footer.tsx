import { Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 p-4">
      <div className="container mx-auto text-center">
        <p className="flex items-center justify-center">
          Powered by ML and <Heart className="w-5 h-5 mx-1 text-red-500" /> for cinema
        </p>
      </div>
    </footer>
  )
}

