"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, Loader2 } from "lucide-react"
import { getAllOffers } from "../services/offerService"

interface Offer {
  _id: string
  type: string
  description: string
  price: number
  pictures: string[]
  disponibility: boolean
  localisation: string
}

export default function Home() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await getAllOffers()
        setOffers(data)
      } catch (error) {
        console.error("Erreur lors du chargement des offres:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOffers()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 animate-gradient-x">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center animate-fade-in-down">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            Découvrez votre prochaine aventure
          </h1>
          <p className="mt-3 max-w-md mx-auto text-xl text-white sm:text-2xl md:mt-5 md:max-w-3xl">
            Explorez des destinations uniques avec Axxam
          </p>

          <div className="mt-10">
            <a
              href="/destinations"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-full text-purple-600 bg-white hover:bg-purple-50 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            >
              <Search className="mr-2 h-6 w-6" />
              Explorer les offres
            </a>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-bold text-white mb-8">Offres disponibles</h2>
          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <Loader2 className="h-12 w-12 text-white animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {offers
                .filter((offer) => offer.disponibility)
                .map((offer, index) => (
                  <div
                    key={offer._id}
                    className="bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative pb-48 overflow-hidden">
                      <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src={offer.pictures[0] || "/placeholder.svg?height=400&width=600"}
                        alt={offer.type}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold text-gray-800 mb-2">{offer.type}</h3>
                      <p className="text-gray-600 mb-4">{offer.description}</p>
                      <p className="text-3xl font-bold text-purple-600 mb-4">{offer.price.toLocaleString()}€</p>
                      <div className="flex items-center mb-4">
                        <MapPin className="h-5 w-5 text-purple-600" />
                        <span className="ml-2 text-sm text-gray-500">{offer.localisation}</span>
                      </div>
                      <a
                        href={`/destinations/${offer._id}`}
                        className="block w-full text-center px-4 py-2 border border-transparent text-lg font-medium rounded-full text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
                      >
                        Voir les détails
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}