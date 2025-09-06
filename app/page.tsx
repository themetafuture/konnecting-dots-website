"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, ArrowRight, Users, Award, Heart, Star, CheckCircle, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white py-20 lg:py-32 mt-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
              Transforming Lives Through NLP & Hypnosis
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-balance">
              Empowering Minds.
              <span className="text-yellow-400"> Transforming Lives.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto text-pretty">
              Unlock your potential with world-class NLP, Hypnosis, and Corporate Training programs designed to create
              lasting change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                  Book a Session
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black bg-transparent"
                onClick={() => {
                  // Placeholder for video modal functionality
                  alert("Video coming soon! Please contact us for more information.")
                }}
                aria-label="Watch introduction video"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Intro Video
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Video Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">A Message from Yousif Mangi</h2>
            <p className="text-xl text-gray-600 mb-8 text-pretty">
              Discover our mission and how we're transforming lives through the power of NLP and Hypnosis
            </p>
            <div className="relative aspect-video bg-gradient-to-br from-teal-400 to-blue-600 rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                  onClick={() => {
                    alert("Video coming soon! Please contact us for more information.")
                  }}
                  aria-label="Play introduction video"
                >
                  <Play className="mr-2 h-8 w-8" />
                  Play Video
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Overview Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">What We Offer</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
              Comprehensive programs designed to unlock human potential and drive organizational success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-yellow-200 transition-colors">
                  <Users className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-balance">ONE on ONE Coaching</h3>
                <p className="text-gray-600 mb-6 text-pretty">
                  Personalized NLP and Hypnosis sessions tailored to your specific goals and challenges.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Individual assessment and goal setting
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Customized NLP techniques
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Online and in-person options
                  </li>
                </ul>
                <Link href="/services/one-on-one-coaching">
                  <Button variant="ghost" className="p-0 h-auto text-yellow-600 hover:text-yellow-700">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-teal-200 transition-colors">
                  <Award className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-balance">Corporate Training</h3>
                <p className="text-gray-600 mb-6 text-pretty">
                  Transform your organization with cutting-edge NLP techniques and leadership development.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Leadership development programs
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Team communication enhancement
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Onsite, online, and hybrid formats
                  </li>
                </ul>
                <Link href="/services/corporate-training">
                  <Button variant="ghost" className="p-0 h-auto text-teal-600 hover:text-teal-700">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                  <Heart className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-balance">DEI Training</h3>
                <p className="text-gray-600 mb-6 text-pretty">
                  Build inclusive workplaces through comprehensive Diversity, Equity, and Inclusion programs.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Unconscious bias training
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Inclusive leadership development
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Cultural competency workshops
                  </li>
                </ul>
                <Link href="/services/dei-training">
                  <Button variant="ghost" className="p-0 h-auto text-purple-600 hover:text-purple-700">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-balance">Train the Trainer</h3>
                <p className="text-gray-600 mb-6 text-pretty">
                  Become a certified trainer and learn to deliver impactful programs to others.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Advanced facilitation skills
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Program design and delivery
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Certification upon completion
                  </li>
                </ul>
                <Link href="/services/train-the-trainer">
                  <Button variant="ghost" className="p-0 h-auto text-blue-600 hover:text-blue-700">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg md:col-span-2 lg:col-span-1">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                  <Award className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-balance">NLP Practitioner</h3>
                <p className="text-gray-600 mb-6 text-pretty">
                  Master and Practitioner certification programs for comprehensive NLP training.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Internationally recognized certification
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Comprehensive curriculum
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Ongoing support and resources
                  </li>
                </ul>
                <Link href="/services/practitioner-master">
                  <Button variant="ghost" className="p-0 h-auto text-green-600 hover:text-green-700">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Client Logos Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Trusted by Leading Organizations</h2>
            <p className="text-xl text-gray-600 text-pretty">Companies worldwide trust us to transform their teams</p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center px-8 py-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-gray-600 font-medium">
                Trusted by Fortune 500 companies and growing organizations worldwide
              </p>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Contact us to learn about our corporate partnerships and success stories
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Success Stories</h2>
            <p className="text-xl text-gray-600 text-pretty">Real transformations from real people</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex mb-4" role="img" aria-label="5 star rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6 text-pretty">
                  "The NLP training transformed our leadership team's communication and boosted our productivity by 40%.
                  The results were immediate and lasting."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-yellow-600 font-bold">JD</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">John Davidson</h4>
                    <p className="text-sm text-gray-600">CEO, TechCorp Solutions</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex mb-4" role="img" aria-label="5 star rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6 text-pretty">
                  "The hypnosis sessions helped me overcome anxiety that had held me back for years. I now feel
                  confident and in control of my life."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-teal-600 font-bold">SM</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Sarah Mitchell</h4>
                    <p className="text-sm text-gray-600">Marketing Director</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex mb-4" role="img" aria-label="5 star rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6 text-pretty">
                  "The DEI training created a more inclusive culture and improved employee satisfaction by 60%. Our team
                  is stronger than ever."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-purple-600 font-bold">RJ</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Robert Johnson</h4>
                    <p className="text-sm text-gray-600">HR Manager</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/testimonials">
              <Button size="lg" variant="outline">
                View All Success Stories
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-teal-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10,000+</div>
              <div className="text-teal-100">Lives Transformed</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-teal-100">Companies Trained</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">95%</div>
              <div className="text-teal-100">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">15+</div>
              <div className="text-teal-100">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-slate-900 to-teal-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Ready to Transform Your Life?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-pretty">
            Join thousands who have already experienced the power of NLP and Hypnosis. Start your transformation journey
            today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                Book Your Free Consultation
              </Button>
            </Link>
            <Link href="/services">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-teal-800 bg-transparent"
              >
                Explore Programs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
