"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Video,
  Headphones,
  FileText,
  Award,
  Calendar,
  MessageCircle,
  Download,
  Play,
  Users,
  BookOpen,
  Eye,
  EyeOff,
  Mail,
} from "lucide-react"
import Link from "next/link"

export default function MemberLoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggedIn(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    })
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 to-teal-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10 text-teal-600 flex-shrink-0" />
              </div>
              <h1 className="text-3xl font-bold mb-2 text-balance">Member Portal</h1>
              <p className="text-gray-600 text-pretty">Access your exclusive content and resources</p>
            </div>

            <Card className="shadow-xl">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl text-balance">Member Login</CardTitle>
                <p className="text-gray-600 text-pretty">Sign in to access your exclusive content and resources</p>
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

                  <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                    Sign In
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
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Welcome Section */}
      <section className="bg-gradient-to-br from-teal-50 to-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              Welcome Back, <span className="text-teal-600">John!</span>
            </h1>
            <p className="text-xl text-gray-600 mb-6 text-pretty">
              Continue your transformation journey with exclusive member content
            </p>
            <Badge className="bg-yellow-100 text-yellow-800">NLP Practitioner Program - Module 3 of 8</Badge>
            <div className="mt-6">
              <Button
                onClick={() => setIsLoggedIn(false)}
                variant="outline"
                className="border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Member Dashboard */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="videos" className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-8">
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="audio">Audio</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
            </TabsList>

            {/* Video Library */}
            <TabsContent value="videos">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-balance">Video Library</h2>
                  <Badge variant="outline">12 of 24 completed</Badge>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-green-100 text-green-800">Completed</Badge>
                        <Video className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      </div>
                      <CardTitle className="text-lg text-balance">Module 1: NLP Foundations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4 text-pretty">
                        Introduction to core NLP principles and techniques
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Duration: 45 min</span>
                        <Button size="sm">
                          <Play className="mr-2 h-4 w-4 flex-shrink-0" />
                          Rewatch
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow border-teal-200">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-teal-100 text-teal-800">Current</Badge>
                        <Video className="h-5 w-5 text-teal-600 flex-shrink-0" />
                      </div>
                      <CardTitle className="text-lg text-balance">Module 3: Advanced Anchoring</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4 text-pretty">Master the art of creating powerful anchors</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Duration: 52 min</span>
                        <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                          <Play className="mr-2 h-4 w-4 flex-shrink-0" />
                          Continue
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow opacity-75">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">Locked</Badge>
                        <Video className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      </div>
                      <CardTitle className="text-lg text-gray-600 text-balance">Module 4: Timeline Therapy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4 text-pretty">Heal past traumas and create future success</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Duration: 38 min</span>
                        <Button size="sm" variant="outline" disabled>
                          Locked
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Audio Suggestions */}
            <TabsContent value="audio">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-balance">Audio Library & Hypnosis Tracks</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-balance">
                        <Headphones className="mr-2 h-5 w-5 text-purple-600 flex-shrink-0" />
                        Personalized Hypnosis Tracks
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-balance">Confidence Booster</h4>
                          <p className="text-sm text-gray-600 text-pretty">Customized for your goals</p>
                        </div>
                        <Button size="sm">
                          <Play className="mr-2 h-4 w-4 flex-shrink-0" />
                          Play
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-balance">Deep Relaxation</h4>
                          <p className="text-sm text-gray-600 text-pretty">Release stress and tension</p>
                        </div>
                        <Button size="sm">
                          <Play className="mr-2 h-4 w-4 flex-shrink-0" />
                          Play
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-balance">
                        <BookOpen className="mr-2 h-5 w-5 text-blue-600 flex-shrink-0" />
                        Audio Suggestions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-balance">Morning Motivation</h4>
                          <p className="text-sm text-gray-600 text-pretty">Start your day powerfully</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Play className="mr-2 h-4 w-4 flex-shrink-0" />
                          Play
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-balance">Focus Enhancement</h4>
                          <p className="text-sm text-gray-600 text-pretty">Improve concentration</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Play className="mr-2 h-4 w-4 flex-shrink-0" />
                          Play
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Notes & Slides */}
            <TabsContent value="notes">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-balance">Notes & Downloadable Materials</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <FileText className="h-8 w-8 text-blue-600 flex-shrink-0" />
                        <Badge className="bg-blue-100 text-blue-800">PDF</Badge>
                      </div>
                      <h3 className="font-bold mb-2 text-balance">Module 1 - Course Notes</h3>
                      <p className="text-sm text-gray-600 mb-4 text-pretty">Complete notes and key takeaways</p>
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        <Download className="mr-2 h-4 w-4 flex-shrink-0" />
                        Download
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <FileText className="h-8 w-8 text-green-600 flex-shrink-0" />
                        <Badge className="bg-green-100 text-green-800">PDF</Badge>
                      </div>
                      <h3 className="font-bold mb-2 text-balance">Practice Worksheets</h3>
                      <p className="text-sm text-gray-600 mb-4 text-pretty">Hands-on exercises and activities</p>
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        <Download className="mr-2 h-4 w-4 flex-shrink-0" />
                        Download
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <FileText className="h-8 w-8 text-purple-600 flex-shrink-0" />
                        <Badge className="bg-purple-100 text-purple-800">PDF</Badge>
                      </div>
                      <h3 className="font-bold mb-2 text-balance">Reference Guide</h3>
                      <p className="text-sm text-gray-600 mb-4 text-pretty">Quick reference for techniques</p>
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        <Download className="mr-2 h-4 w-4 flex-shrink-0" />
                        Download
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Certificates */}
            <TabsContent value="certificates">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-balance">Your Certificates</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-yellow-200 bg-yellow-50">
                    <CardContent className="p-6 text-center">
                      <Award className="h-16 w-16 text-yellow-600 mx-auto mb-4 flex-shrink-0" />
                      <h3 className="text-xl font-bold mb-2 text-balance">NLP Foundation Certificate</h3>
                      <p className="text-gray-600 mb-4 text-pretty">Completed: March 15, 2024</p>
                      <Button className="bg-yellow-600 hover:bg-yellow-700">
                        <Download className="mr-2 h-4 w-4 flex-shrink-0" />
                        Download Certificate
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-200 bg-gray-50 opacity-75">
                    <CardContent className="p-6 text-center">
                      <Award className="h-16 w-16 text-gray-400 mx-auto mb-4 flex-shrink-0" />
                      <h3 className="text-xl font-bold mb-2 text-gray-600 text-balance">
                        NLP Practitioner Certificate
                      </h3>
                      <p className="text-gray-500 mb-4 text-pretty">In Progress - 60% Complete</p>
                      <Button variant="outline" disabled>
                        Certificate Pending
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Alumni Events */}
            <TabsContent value="events">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-balance">Alumni Events & Reunions</h2>

                <div className="space-y-4">
                  <Card className="border-teal-200 bg-teal-50">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <Calendar className="h-8 w-8 text-teal-600 mr-4 flex-shrink-0" />
                          <div>
                            <h3 className="text-xl font-bold text-balance">Monthly Alumni Meetup</h3>
                            <p className="text-gray-600 text-pretty">Virtual networking and skill practice</p>
                            <p className="text-sm text-teal-600 font-medium">Next: April 20, 2024 at 7:00 PM EST</p>
                          </div>
                        </div>
                        <Button className="bg-teal-600 hover:bg-teal-700">Register</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <Calendar className="h-8 w-8 text-purple-600 mr-4 flex-shrink-0" />
                          <div>
                            <h3 className="text-xl font-bold text-balance">Annual NLP Conference</h3>
                            <p className="text-gray-600 text-pretty">3-day intensive with guest speakers</p>
                            <p className="text-sm text-purple-600 font-medium">June 15-17, 2024 in Miami, FL</p>
                          </div>
                        </div>
                        <Button variant="outline">Learn More</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Community Forum */}
            <TabsContent value="community">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-balance">Private Discussion Forum</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-balance">
                        <MessageCircle className="mr-2 h-5 w-5 text-blue-600 flex-shrink-0" />
                        Recent Discussions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-medium text-balance">Anchoring Techniques in Practice</h4>
                        <p className="text-sm text-gray-600">Started by Sarah M. • 3 replies</p>
                      </div>

                      <div className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-medium text-balance">Success Story: Overcoming Public Speaking</h4>
                        <p className="text-sm text-gray-600">Started by Mike R. • 8 replies</p>
                      </div>

                      <div className="border-l-4 border-purple-500 pl-4">
                        <h4 className="font-medium text-balance">Timeline Therapy Questions</h4>
                        <p className="text-sm text-gray-600">Started by Lisa K. • 2 replies</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-balance">
                        <Users className="mr-2 h-5 w-5 text-green-600 flex-shrink-0" />
                        Group Chat Rooms
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-balance">General Discussion</h4>
                          <p className="text-sm text-gray-600">24 members online</p>
                        </div>
                        <Button size="sm">Join Chat</Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-balance">Practice Partners</h4>
                          <p className="text-sm text-gray-600">12 members online</p>
                        </div>
                        <Button size="sm">Join Chat</Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-balance">Success Stories</h4>
                          <p className="text-sm text-gray-600">8 members online</p>
                        </div>
                        <Button size="sm">Join Chat</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
