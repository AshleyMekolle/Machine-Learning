"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { searchMovies } from "../utils/tmdb"

export default function Preferences() {
  const [favoriteMovies, setFavoriteMovies] = useState(["", "", ""])
  const [searchResults, setSearchResults] = useState([])
  const router = useRouter()

  const handleMovieChange = async (index: number, value: string) => {
    const newMovies = [...favoriteMovies]
    newMovies[index] = value
    setFavoriteMovies(newMovies)

    if (value.length > 2) {
      const results = await searchMovies(value)
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  const handleMovieSelect = (index: number, movie) => {
    const newMovies = [...favoriteMovies]
    newMovies[index] = movie.title
    setFavoriteMovies(newMovies)
    setSearchResults([])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log({ favoriteMovies })
    // Then redirect to recommendations page
    router.push("/recommendations")
  }

  return (
    <motion.div
      className="max-w-md mx-auto bg-gray-800 p-8 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">Your Movie Preferences</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="movie1" className="text-lg font-semibold text-gray-300">
            Your Top 3 Favorite Movies
          </Label>
          {favoriteMovies.map((movie, index) => (
            <div key={index} className="relative">
              <Input
                id={`movie${index + 1}`}
                value={movie}
                onChange={(e) => handleMovieChange(index, e.target.value)}
                placeholder={`Favorite Movie ${index + 1}`}
                className="mt-2 bg-gray-700 text-white border-gray-600"
              />
              {searchResults.length > 0 && (
                <ul className="absolute z-10 w-full bg-gray-700 mt-1 rounded-md shadow-lg">
                  {searchResults.slice(0, 5).map((result) => (
                    <li
                      key={result.id}
                      className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                      onClick={() => handleMovieSelect(index, result)}
                    >
                      {result.title} ({new Date(result.release_date).getFullYear()})
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Get Recommendations
        </Button>
      </form>
    </motion.div>
  )
}

