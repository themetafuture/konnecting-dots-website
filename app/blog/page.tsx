import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, User, Search, ArrowRight, BookOpen, TrendingUp, Heart } from "lucide-react"

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 to-purple-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-indigo-100 text-indigo-800">Insights & Articles</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transform Your Mind with
              <span className="text-indigo-600"> Expert Insights</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover the latest in NLP, Hypnosis, Personal Development, and Corporate Training through our expert
              articles and insights
            </p>

            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input placeholder="Search articles..." className="pl-10 pr-4 py-3 text-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Article</h2>
          </div>

          <Card className="overflow-hidden hover:shadow-xl transition-shadow border-2 border-yellow-200">
            <div className="grid lg:grid-cols-2">
              <div className="aspect-video lg:aspect-square bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <BookOpen className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold">Featured Article</h3>
                </div>
              </div>
              <div className="p-8 lg:p-12">
                <Badge className="mb-4 bg-yellow-100 text-yellow-800">NLP Techniques</Badge>
                <h3 className="text-3xl font-bold mb-4">The Science Behind Rapid Personal Transformation</h3>
                <p className="text-gray-600 mb-6 text-lg">
                  Discover how cutting-edge neuroscience research validates ancient NLP techniques and why some people
                  achieve breakthrough results in days while others struggle for years.
                </p>

                <div className="flex items-center mb-6 text-sm text-gray-500">
                  <User className="h-4 w-4 mr-2" />
                  <span className="mr-4">Yousif Mangi</span>
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="mr-4">March 15, 2024</span>
                  <Clock className="h-4 w-4 mr-2" />
                  <span>8 min read</span>
                </div>

                <Button size="lg">
                  Read Full Article
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Article Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse by Category</h2>
            <p className="text-xl text-gray-600">Find articles that match your interests</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">NLP Techniques</h3>
                <p className="text-gray-600 mb-4">Master the art of Neuro-Linguistic Programming</p>
                <Badge variant="outline">24 Articles</Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                  <Heart className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Hypnosis & Healing</h3>
                <p className="text-gray-600 mb-4">Explore the therapeutic power of hypnosis</p>
                <Badge variant="outline">18 Articles</Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Corporate Training</h3>
                <p className="text-gray-600 mb-4">Transform workplace culture and performance</p>
                <Badge variant="outline">15 Articles</Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-teal-200 transition-colors">
                  <User className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Personal Development</h3>
                <p className="text-gray-600 mb-4">Strategies for continuous growth and success</p>
                <Badge variant="outline">21 Articles</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Articles</h2>
            <p className="text-xl text-gray-600">Stay updated with our newest insights and discoveries</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-white" />
              </div>
              <CardContent className="p-6">
                <Badge className="mb-3 bg-blue-100 text-blue-800">NLP Techniques</Badge>
                <h3 className="text-xl font-bold mb-3">5 NLP Anchoring Techniques That Actually Work</h3>
                <p className="text-gray-600 mb-4">
                  Learn the most effective anchoring methods used by top NLP practitioners to create lasting behavioral
                  change.
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>March 12, 2024</span>
                  <span>6 min read</span>
                </div>
                <Button variant="ghost" className="p-0 h-auto text-blue-600 hover:text-blue-700">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <Heart className="h-12 w-12 text-white" />
              </div>
              <CardContent className="p-6">
                <Badge className="mb-3 bg-purple-100 text-purple-800">Hypnosis</Badge>
                <h3 className="text-xl font-bold mb-3">Debunking Common Hypnosis Myths</h3>
                <p className="text-gray-600 mb-4">
                  Separate fact from fiction and understand what hypnosis really is and how it can benefit your life.
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>March 10, 2024</span>
                  <span>5 min read</span>
                </div>
                <Button variant="ghost" className="p-0 h-auto text-purple-600 hover:text-purple-700">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <TrendingUp className="h-12 w-12 text-white" />
              </div>
              <CardContent className="p-6">
                <Badge className="mb-3 bg-green-100 text-green-800">Corporate</Badge>
                <h3 className="text-xl font-bold mb-3">Building Inclusive Teams: A Practical Guide</h3>
                <p className="text-gray-600 mb-4">
                  Actionable strategies for creating workplace environments where everyone feels valued and heard.
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>March 8, 2024</span>
                  <span>7 min read</span>
                </div>
                <Button variant="ghost" className="p-0 h-auto text-green-600 hover:text-green-700">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                <User className="h-12 w-12 text-white" />
              </div>
              <CardContent className="p-6">
                <Badge className="mb-3 bg-teal-100 text-teal-800">Personal Development</Badge>
                <h3 className="text-xl font-bold mb-3">The Power of Visualization in Goal Achievement</h3>
                <p className="text-gray-600 mb-4">
                  Discover how mental imagery can accelerate your progress toward any goal you set for yourself.
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>March 5, 2024</span>
                  <span>8 min read</span>
                </div>
                <Button variant="ghost" className="p-0 h-auto text-teal-600 hover:text-teal-700">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-white" />
              </div>
              <CardContent className="p-6">
                <Badge className="mb-3 bg-orange-100 text-orange-800">Case Study</Badge>
                <h3 className="text-xl font-bold mb-3">How One CEO Transformed Company Culture in 90 Days</h3>
                <p className="text-gray-600 mb-4">
                  A detailed case study of rapid organizational transformation using NLP and leadership coaching.
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>March 3, 2024</span>
                  <span>10 min read</span>
                </div>
                <Button variant="ghost" className="p-0 h-auto text-orange-600 hover:text-orange-700">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center">
                <Heart className="h-12 w-12 text-white" />
              </div>
              <CardContent className="p-6">
                <Badge className="mb-3 bg-pink-100 text-pink-800">Wellness</Badge>
                <h3 className="text-xl font-bold mb-3">Stress Management Through Self-Hypnosis</h3>
                <p className="text-gray-600 mb-4">
                  Learn simple self-hypnosis techniques you can use anywhere to manage stress and anxiety effectively.
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>March 1, 2024</span>
                  <span>6 min read</span>
                </div>
                <Button variant="ghost" className="p-0 h-auto text-pink-600 hover:text-pink-700">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl mb-8">
              Get the latest insights on NLP, Hypnosis, and Personal Development delivered to your inbox
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                placeholder="Enter your email"
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/70"
              />
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">Subscribe</Button>
            </div>

            <p className="text-sm mt-4 text-white/80">Join 10,000+ readers. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
