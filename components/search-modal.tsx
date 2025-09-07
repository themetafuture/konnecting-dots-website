"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Play, FileText, Users, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

interface SearchResult {
  id: string
  title: string
  type: 'course' | 'blog' | 'event' | 'page'
  description: string
  url: string
  category?: string
  date?: string
}

interface SearchModalProps {
  children: React.ReactNode
}

export default function SearchModal({ children }: SearchModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)

  // Mock search data - in a real app, this would come from an API
  const mockData: SearchResult[] = [
    {
      id: "1",
      title: "NLP Practitioner Certification",
      type: "course",
      description: "Complete NLP training program with certification",
      url: "/services/practitioner-master",
      category: "NLP",
    },
    {
      id: "2",
      title: "Understanding Submodalities",
      type: "blog",
      description: "Learn how to change internal representations using NLP techniques",
      url: "/blog/understanding-submodalities",
      category: "NLP Techniques",
      date: "2024-01-15",
    },
    {
      id: "3",
      title: "Corporate Training Workshop",
      type: "event",
      description: "Transform your team with advanced communication skills",
      url: "/events/corporate-training-workshop",
      category: "Corporate Training",
      date: "2024-02-20",
    },
    {
      id: "4",
      title: "ONE on ONE Coaching",
      type: "page",
      description: "Personalized coaching sessions for individual transformation",
      url: "/services/one-on-one-coaching",
      category: "Coaching",
    },
    {
      id: "5",
      title: "Hypnosis for Anxiety Relief",
      type: "blog",
      description: "Effective techniques for managing anxiety through hypnosis",
      url: "/blog/hypnosis-anxiety-relief",
      category: "Hypnosis",
      date: "2024-01-10",
    },
    {
      id: "6",
      title: "DEI Training Program",
      type: "course",
      description: "Comprehensive diversity, equity, and inclusion training",
      url: "/services/dei-training",
      category: "DEI Training",
    },
  ]

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // Filter mock data based on search query
    const filtered = mockData.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category?.toLowerCase().includes(query.toLowerCase())
    )
    
    setSearchResults(filtered)
    setIsSearching(false)
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(searchQuery)
    }, 300) // Debounce search

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <Users className="h-4 w-4 text-blue-600" />
      case 'blog':
        return <FileText className="h-4 w-4 text-green-600" />
      case 'event':
        return <Calendar className="h-4 w-4 text-purple-600" />
      case 'page':
        return <Play className="h-4 w-4 text-orange-600" />
      default:
        return <Search className="h-4 w-4 text-gray-600" />
    }
  }

  const getResultTypeColor = (type: string) => {
    switch (type) {
      case 'course':
        return 'bg-blue-100 text-blue-800'
      case 'blog':
        return 'bg-green-100 text-green-800'
      case 'event':
        return 'bg-purple-100 text-purple-800'
      case 'page':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Search className="h-5 w-5 text-teal-600" />
            Search Konnecting Dots
          </DialogTitle>
          <DialogDescription>
            Find courses, articles, events, and more
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search for courses, articles, events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>

          {/* Search Results */}
          <div className="max-h-[400px] overflow-y-auto">
            {isSearching ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-600"></div>
                <span className="ml-2 text-gray-600">Searching...</span>
              </div>
            ) : searchQuery && searchResults.length === 0 ? (
              <div className="text-center py-8">
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No results found for "{searchQuery}"</p>
                <p className="text-sm text-gray-500 mt-2">Try different keywords or check your spelling</p>
              </div>
            ) : searchQuery && searchResults.length > 0 ? (
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
                </p>
                {searchResults.map((result) => (
                  <Link
                    key={result.id}
                    href={result.url}
                    onClick={() => setIsOpen(false)}
                    className="block"
                  >
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {getResultIcon(result.type)}
                              <h3 className="font-semibold text-sm">{result.title}</h3>
                              <Badge className={`text-xs ${getResultTypeColor(result.type)}`}>
                                {result.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{result.description}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              {result.category && (
                                <span>Category: {result.category}</span>
                              )}
                              {result.date && (
                                <span>Published: {new Date(result.date).toLocaleDateString()}</span>
                              )}
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Start typing to search</p>
                <p className="text-sm text-gray-500 mt-2">Search for courses, articles, events, and more</p>
              </div>
            )}
          </div>

          {/* Quick Links */}
          {!searchQuery && (
            <div className="pt-4 border-t">
              <h4 className="font-semibold text-sm mb-3">Popular Searches</h4>
              <div className="flex flex-wrap gap-2">
                {['NLP Certification', 'Hypnosis Training', 'Corporate Training', 'DEI Workshop', 'One-on-One Coaching'].map((term) => (
                  <Button
                    key={term}
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery(term)}
                    className="text-xs"
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
