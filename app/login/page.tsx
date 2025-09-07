"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Video,
  Headphones,
  FileText,
  Award,
  Calendar,
  Download,
  Play,
  Users,
  BookOpen,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  Clock,
  TrendingUp,
  Globe,
  Mail,
  Loader2,
} from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loginError, setLoginError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setLoginError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      })

      const result = await response.json()

      if (result.success) {
        setIsLoggedIn(true)
        // Store user data in localStorage for client-side access
        localStorage.setItem('user', JSON.stringify(result.data.user))
      } else {
        setLoginError(result.message || 'Login failed. Please check your credentials.')
      }
    } catch (error) {
      console.error('Login error:', error)
      setLoginError('Login failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      })
      localStorage.removeItem('user')
      setIsLoggedIn(false)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 to-teal-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10 text-teal-600" />
              </div>
              <h1 className="text-3xl font-bold mb-2 text-balance">Student Portal</h1>
              <p className="text-gray-600 text-pretty">Access your exclusive learning resources and community</p>
            </div>

            <Card className="shadow-xl">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl text-balance">Welcome Back</CardTitle>
                <p className="text-gray-600 text-pretty">Sign in to continue your transformation journey</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={loginData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative mt-1">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={loginData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-teal-600 mr-2" />
                      <span className="text-sm text-gray-600">Remember me</span>
                    </label>
                    <Link href="/forgot-password" className="text-sm text-teal-600 hover:text-teal-700">
                      Forgot password?
                    </Link>
                  </div>

                  {loginError && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center">
                        <div className="h-5 w-5 bg-red-600 rounded-full mr-2 flex items-center justify-center">
                          <span className="text-white text-xs">!</span>
                        </div>
                        <p className="text-red-800 font-medium">{loginError}</p>
                      </div>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 text-pretty">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-teal-600 hover:text-teal-700 font-medium">
                      Create account
                    </Link>
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-4">Quick Access</p>
                    <div className="grid grid-cols-2 gap-3">
                      <Link href="/resources">
                        <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
                          <BookOpen className="mr-1 h-3 w-3 flex-shrink-0" />
                          Free Resources
                        </Button>
                      </Link>
                      <Link href="/contact">
                        <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
                          <Mail className="mr-1 h-3 w-3 flex-shrink-0" />
                          Get Support
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Benefits Preview */}
            <Card className="mt-8 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-center text-balance">Student Portal Benefits</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Video className="h-5 w-5 mr-3 text-yellow-300 flex-shrink-0" />
                    <span className="text-sm">Exclusive video library access</span>
                  </div>
                  <div className="flex items-center">
                    <Headphones className="h-5 w-5 mr-3 text-yellow-300 flex-shrink-0" />
                    <span className="text-sm">Personalized hypnosis tracks</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-5 w-5 mr-3 text-yellow-300 flex-shrink-0" />
                    <span className="text-sm">Digital certificates</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-3 text-yellow-300 flex-shrink-0" />
                    <span className="text-sm">Alumni community access</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Welcome Header */}
      <section className="bg-gradient-to-br from-teal-50 to-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-balance">
                  Welcome Back, <span className="text-teal-600">Sarah!</span>
                </h1>
                <p className="text-xl text-gray-600 text-pretty">Continue your transformation journey</p>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent"
              >
                Sign Out
              </Button>
            </div>

            {/* Progress Overview */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-teal-200 bg-teal-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-teal-800 text-balance">Current Program</h3>
                    <Badge className="bg-teal-100 text-teal-800">Active</Badge>
                  </div>
                  <p className="text-lg font-semibold mb-2 text-balance">NLP Practitioner Certification</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                    <p className="text-sm text-gray-600">Module 5 of 8 completed</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-balance">Learning Stats</h3>
                    <TrendingUp className="h-5 w-5 text-green-600 flex-shrink-0" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Videos Watched</span>
                      <span className="font-semibold">24/32</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Hours Completed</span>
                      <span className="font-semibold">18.5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Certificates Earned</span>
                      <span className="font-semibold">2</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-balance">Upcoming Events</h3>
                    <Calendar className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-sm text-balance">Alumni Meetup</p>
                      <p className="text-xs text-gray-600">April 20, 7:00 PM EST</p>
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-balance">Master Class</p>
                      <p className="text-xs text-gray-600">April 25, 2:00 PM EST</p>
                    </div>
                    <Link href="/events">
                      <Button size="sm" variant="outline" className="w-full mt-3 bg-transparent">
                        View All Events
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="videos" className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-8">
              <TabsTrigger value="videos">Video Library</TabsTrigger>
              <TabsTrigger value="audio">Audio Tracks</TabsTrigger>
              <TabsTrigger value="notes">Notes & PDFs</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
              <TabsTrigger value="events">Alumni Events</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
            </TabsList>

            {/* Video Library */}
            <TabsContent value="videos">
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-balance">Video Library</h2>
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline">24 of 32 completed</Badge>
                    <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                      <option>All Modules</option>
                      <option>Module 1: Foundations</option>
                      <option>Module 2: Communication</option>
                      <option>Module 3: Anchoring</option>
                      <option>Module 4: Timeline Therapy</option>
                      <option>Module 5: Advanced Techniques</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Completed Video */}
                  <Card className="hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <div className="aspect-video bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center rounded-t-lg">
                        <Play className="h-12 w-12 text-white" />
                      </div>
                      <Badge className="absolute top-3 left-3 bg-green-100 text-green-800">Completed</Badge>
                      <div className="absolute top-3 right-3">
                        <CheckCircle className="h-6 w-6 text-white bg-green-500 rounded-full" />
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-2 text-balance">Module 1: NLP Foundations</h3>
                      <p className="text-sm text-gray-600 mb-3 text-pretty">
                        Introduction to core NLP principles and techniques
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Duration: 45 min</span>
                        <Button size="sm" variant="outline">
                          <Play className="mr-2 h-4 w-4 flex-shrink-0" />
                          Rewatch
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Current Video */}
                  <Card className="hover:shadow-lg transition-shadow border-teal-200 bg-teal-50">
                    <div className="relative">
                      <div className="aspect-video bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center rounded-t-lg">
                        <Play className="h-12 w-12 text-white" />
                      </div>
                      <Badge className="absolute top-3 left-3 bg-teal-100 text-teal-800">Current</Badge>
                      <div className="absolute bottom-3 left-3 right-3">
                        <Progress value={35} className="h-2 bg-white/20" />
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-2 text-balance">Module 5: Advanced Anchoring</h3>
                      <p className="text-sm text-gray-600 mb-3 text-pretty">
                        Master the art of creating powerful anchors
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Duration: 52 min</span>
                        <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                          <Play className="mr-2 h-4 w-4 flex-shrink-0" />
                          Continue
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Locked Video */}
                  <Card className="hover:shadow-lg transition-shadow opacity-75">
                    <div className="relative">
                      <div className="aspect-video bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center rounded-t-lg">
                        <Lock className="h-12 w-12 text-white" />
                      </div>
                      <Badge className="absolute top-3 left-3 bg-gray-100 text-gray-800">Locked</Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-2 text-gray-600 text-balance">Module 6: Timeline Therapy</h3>
                      <p className="text-sm text-gray-500 mb-3 text-pretty">
                        Heal past traumas and create future success
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Duration: 38 min</span>
                        <Button size="sm" variant="outline" disabled>
                          <Lock className="mr-2 h-4 w-4 flex-shrink-0" />
                          Locked
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* More videos... */}
                  <Card className="hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <div className="aspect-video bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center rounded-t-lg">
                        <Play className="h-12 w-12 text-white" />
                      </div>
                      <Badge className="absolute top-3 left-3 bg-green-100 text-green-800">Completed</Badge>
                      <div className="absolute top-3 right-3">
                        <CheckCircle className="h-6 w-6 text-white bg-green-500 rounded-full" />
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-2">Module 2: Communication Mastery</h3>
                      <p className="text-sm text-gray-600 mb-3">Advanced rapport building and influence techniques</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Duration: 48 min</span>
                        <Button size="sm" variant="outline">
                          <Play className="mr-2 h-4 w-4" />
                          Rewatch
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <div className="aspect-video bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center rounded-t-lg">
                        <Play className="h-12 w-12 text-white" />
                      </div>
                      <Badge className="absolute top-3 left-3 bg-green-100 text-green-800">Completed</Badge>
                      <div className="absolute top-3 right-3">
                        <CheckCircle className="h-6 w-6 text-white bg-green-500 rounded-full" />
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-2">Module 3: Submodalities</h3>
                      <p className="text-sm text-gray-600 mb-3">Understanding and changing internal representations</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Duration: 41 min</span>
                        <Button size="sm" variant="outline">
                          <Play className="mr-2 h-4 w-4" />
                          Rewatch
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <div className="aspect-video bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center rounded-t-lg">
                        <Play className="h-12 w-12 text-white" />
                      </div>
                      <Badge className="absolute top-3 left-3 bg-green-100 text-green-800">Completed</Badge>
                      <div className="absolute top-3 right-3">
                        <CheckCircle className="h-6 w-6 text-white bg-green-500 rounded-full" />
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-2">Module 4: Meta Programs</h3>
                      <p className="text-sm text-gray-600 mb-3">Identifying and utilizing thinking patterns</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Duration: 55 min</span>
                        <Button size="sm" variant="outline">
                          <Play className="mr-2 h-4 w-4" />
                          Rewatch
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Audio Tracks */}
            <TabsContent value="audio">
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Audio Library & Hypnosis Tracks</h2>
                  <Badge variant="outline">12 tracks available</Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Headphones className="mr-2 h-5 w-5 text-purple-600" />
                        Personalized Hypnosis Tracks
                      </CardTitle>
                      <p className="text-sm text-gray-600">Custom tracks based on your goals and progress</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                        <div>
                          <h4 className="font-medium">Confidence Booster</h4>
                          <p className="text-sm text-gray-600">Customized for your leadership goals</p>
                          <div className="flex items-center mt-2">
                            <Clock className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-500">25 minutes</span>
                          </div>
                        </div>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          <Play className="mr-2 h-4 w-4" />
                          Play
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                        <div>
                          <h4 className="font-medium">Deep Relaxation</h4>
                          <p className="text-sm text-gray-600">Release stress and tension</p>
                          <div className="flex items-center mt-2">
                            <Clock className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-500">30 minutes</span>
                          </div>
                        </div>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Play className="mr-2 h-4 w-4" />
                          Play
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                        <div>
                          <h4 className="font-medium">Success Visualization</h4>
                          <p className="text-sm text-gray-600">Program your mind for achievement</p>
                          <div className="flex items-center mt-2">
                            <Clock className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-500">20 minutes</span>
                          </div>
                        </div>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <Play className="mr-2 h-4 w-4" />
                          Play
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BookOpen className="mr-2 h-5 w-5 text-teal-600" />
                        Audio Suggestions
                      </CardTitle>
                      <p className="text-sm text-gray-600">Recommended tracks for your current module</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-teal-50 rounded-lg">
                        <div>
                          <h4 className="font-medium">Morning Motivation</h4>
                          <p className="text-sm text-gray-600">Start your day powerfully</p>
                          <div className="flex items-center mt-2">
                            <Clock className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-500">15 minutes</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Play className="mr-2 h-4 w-4" />
                          Play
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                        <div>
                          <h4 className="font-medium">Focus Enhancement</h4>
                          <p className="text-sm text-gray-600">Improve concentration and clarity</p>
                          <div className="flex items-center mt-2">
                            <Clock className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-500">18 minutes</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Play className="mr-2 h-4 w-4" />
                          Play
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-pink-50 rounded-lg">
                        <div>
                          <h4 className="font-medium">Sleep Preparation</h4>
                          <p className="text-sm text-gray-600">Peaceful transition to rest</p>
                          <div className="flex items-center mt-2">
                            <Clock className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-500">22 minutes</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Play className="mr-2 h-4 w-4" />
                          Play
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recently Played */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recently Played</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <Headphones className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">Confidence Booster</h4>
                          <p className="text-xs text-gray-500">Played 2 hours ago</p>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Headphones className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">Deep Relaxation</h4>
                          <p className="text-xs text-gray-500">Played yesterday</p>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <Headphones className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">Morning Motivation</h4>
                          <p className="text-xs text-gray-500">Played 3 days ago</p>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Notes & PDFs */}
            <TabsContent value="notes">
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Notes & Downloadable Materials</h2>
                  <Badge variant="outline">18 documents available</Badge>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <FileText className="h-8 w-8 text-blue-600" />
                        <Badge className="bg-blue-100 text-blue-800">PDF</Badge>
                      </div>
                      <h3 className="font-bold mb-2">Module 1 - Complete Notes</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Comprehensive notes and key takeaways from foundations module
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <span>12 pages</span>
                        <span>Updated: Mar 15</span>
                      </div>
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <FileText className="h-8 w-8 text-green-600" />
                        <Badge className="bg-green-100 text-green-800">PDF</Badge>
                      </div>
                      <h3 className="font-bold mb-2">Practice Worksheets</h3>
                      <p className="text-sm text-gray-600 mb-4">Hands-on exercises and practical applications</p>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <span>8 pages</span>
                        <span>Updated: Mar 20</span>
                      </div>
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <FileText className="h-8 w-8 text-purple-600" />
                        <Badge className="bg-purple-100 text-purple-800">PDF</Badge>
                      </div>
                      <h3 className="font-bold mb-2">Quick Reference Guide</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Essential techniques and patterns for quick reference
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <span>6 pages</span>
                        <span>Updated: Mar 18</span>
                      </div>
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <FileText className="h-8 w-8 text-teal-600" />
                        <Badge className="bg-teal-100 text-teal-800">PDF</Badge>
                      </div>
                      <h3 className="font-bold mb-2">Module 2 - Slides</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Presentation slides from communication mastery module
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <span>24 slides</span>
                        <span>Updated: Mar 22</span>
                      </div>
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <FileText className="h-8 w-8 text-orange-600" />
                        <Badge className="bg-orange-100 text-orange-800">PDF</Badge>
                      </div>
                      <h3 className="font-bold mb-2">Assessment Templates</h3>
                      <p className="text-sm text-gray-600 mb-4">Client assessment forms and evaluation tools</p>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <span>10 pages</span>
                        <span>Updated: Mar 25</span>
                      </div>
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <FileText className="h-8 w-8 text-red-600" />
                        <Badge className="bg-red-100 text-red-800">PDF</Badge>
                      </div>
                      <h3 className="font-bold mb-2">Bonus Resources</h3>
                      <p className="text-sm text-gray-600 mb-4">Additional reading materials and research papers</p>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <span>15 pages</span>
                        <span>Updated: Mar 28</span>
                      </div>
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Recently Downloaded */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recently Downloaded</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <div>
                            <h4 className="font-medium text-sm">Module 1 - Complete Notes</h4>
                            <p className="text-xs text-gray-500">Downloaded 2 days ago</p>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-green-600" />
                          <div>
                            <h4 className="font-medium text-sm">Practice Worksheets</h4>
                            <p className="text-xs text-gray-500">Downloaded 1 week ago</p>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Certificates */}
            <TabsContent value="certificates">
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Your Certificates</h2>
                  <Badge variant="outline">2 earned, 1 in progress</Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Earned Certificate */}
                  <Card className="border-yellow-200 bg-yellow-50">
                    <CardContent className="p-8 text-center">
                      <Award className="h-20 w-20 text-yellow-600 mx-auto mb-6" />
                      <h3 className="text-2xl font-bold mb-2">NLP Foundation Certificate</h3>
                      <p className="text-gray-600 mb-4">Successfully completed foundational NLP training</p>
                      <div className="space-y-2 mb-6">
                        <p className="text-sm">
                          <strong>Completed:</strong> March 15, 2024
                        </p>
                        <p className="text-sm">
                          <strong>Certificate ID:</strong> NLP-FOUND-2024-001234
                        </p>
                        <p className="text-sm">
                          <strong>Issued to:</strong> Sarah Mitchell
                        </p>
                      </div>
                      <div className="flex flex-col space-y-3">
                        <Button className="bg-yellow-600 hover:bg-yellow-700">
                          <Download className="mr-2 h-4 w-4" />
                          Download Certificate
                        </Button>
                        <Button variant="outline" size="sm">
                          <Globe className="mr-2 h-4 w-4" />
                          Verify Online
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* In Progress Certificate */}
                  <Card className="border-teal-200 bg-teal-50">
                    <CardContent className="p-8 text-center">
                      <div className="relative mb-6">
                        <Award className="h-20 w-20 text-teal-600 mx-auto opacity-50" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-white rounded-full p-2">
                            <Clock className="h-8 w-8 text-teal-600" />
                          </div>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-teal-800">NLP Practitioner Certificate</h3>
                      <p className="text-gray-600 mb-4">Complete your training to earn this certificate</p>
                      <div className="space-y-3 mb-6">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>65%</span>
                          </div>
                          <Progress value={65} className="h-3" />
                        </div>
                        <p className="text-sm text-gray-600">3 more modules to complete</p>
                      </div>
                      <Button variant="outline" disabled className="bg-transparent">
                        Certificate Pending
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Certificate History */}
                <Card>
                  <CardHeader>
                    <CardTitle>Certificate History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Award className="h-8 w-8 text-green-600" />
                          <div>
                            <h4 className="font-semibold">NLP Foundation Certificate</h4>
                            <p className="text-sm text-gray-600">Earned on March 15, 2024</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-100 text-green-800">Completed</Badge>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Award className="h-8 w-8 text-blue-600" />
                          <div>
                            <h4 className="font-semibold">Communication Excellence Certificate</h4>
                            <p className="text-sm text-gray-600">Earned on February 28, 2024</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-blue-100 text-blue-800">Completed</Badge>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg opacity-75">
                        <div className="flex items-center space-x-4">
                          <Award className="h-8 w-8 text-gray-400" />
                          <div>
                            <h4 className="font-semibold text-gray-600">NLP Master Practitioner Certificate</h4>
                            <p className="text-sm text-gray-500">Available after Practitioner completion</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
