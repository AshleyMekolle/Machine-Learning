import Link from "next/link"
import { Home, Film, User } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-gray-800 text-gray-100 p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center space-x-2">
          <Film className="w-8 h-8" />
          <span>CineInsight</span>
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:text-blue-400 transition-colors flex items-center">
              <Home className="w-5 h-5 mr-1" />
              Home
            </Link>
          </li>
          <li>
            <Link href="/profile" className="hover:text-blue-400 transition-colors flex items-center">
              <User className="w-5 h-5 mr-1" />
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

