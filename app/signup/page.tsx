"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, Users, CheckCircle, ArrowRight, Shield, Award, Video, Headphones, Loader2 } from "lucide-react"
import Link from "next/link"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    program: "",
    agreeToTerms: false,
    subscribeNewsletter: true,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setSubmitStatus('error')
      setSubmitMessage('Passwords do not match')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: 'STUDENT',
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        setSubmitMessage('Account created successfully! You can now sign in.')
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          program: "",
          agreeToTerms: false,
          subscribeNewsletter: true,
        })
      } else {
        setSubmitStatus('error')
        setSubmitMessage(result.message || 'Failed to create account. Please try again.')
      }
    } catch (error) {
      console.error('Registration error:', error)
      setSubmitStatus('error')
      setSubmitMessage('Failed to create account. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      program: value,
    })
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-teal-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-10 w-10 text-teal-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-balance">Join Konnecting Dots</h1>
            <p className="text-xl text-gray-600 text-pretty">
              Start your transformation journey with our world-class NLP and personal development programs
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Registration Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-balance">Create Your Account</CardTitle>
                  <p className="text-gray-600 text-pretty">
                    Fill out the form below to get started with your transformation
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="Enter your first name"
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Enter your last name"
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="program">Program Interest</Label>
                      <Select onValueChange={handleSelectChange}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select a program" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nlp-practitioner">NLP Practitioner Certification</SelectItem>
                          <SelectItem value="master-practitioner">NLP Master Practitioner</SelectItem>
                          <SelectItem value="train-trainer">Train the Trainer</SelectItem>
                          <SelectItem value="corporate">Corporate Training</SelectItem>
                          <SelectItem value="dei">DEI Training</SelectItem>
                          <SelectItem value="one-on-one">ONE on ONE Coaching</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="password">Password *</Label>
                      <div className="relative mt-1">
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Create a strong password"
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

                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password *</Label>
                      <div className="relative mt-1">
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm your password"
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                          className="mt-1"
                        />
                        <Label htmlFor="agreeToTerms" className="text-sm leading-relaxed text-pretty">
                          I agree to the{" "}
                          <Link href="/terms" className="text-teal-600 hover:text-teal-700 underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-teal-600 hover:text-teal-700 underline">
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="subscribeNewsletter"
                          checked={formData.subscribeNewsletter}
                          onCheckedChange={(checked) =>
                            setFormData({ ...formData, subscribeNewsletter: checked as boolean })
                          }
                          className="mt-1"
                        />
                        <Label htmlFor="subscribeNewsletter" className="text-sm leading-relaxed text-pretty">
                          Subscribe to our newsletter for exclusive content, tips, and program updates
                        </Label>
                      </div>
                    </div>

                    {submitStatus === 'success' && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                          <p className="text-green-800 font-medium">{submitMessage}</p>
                        </div>
                      </div>
                    )}

                    {submitStatus === 'error' && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center">
                          <div className="h-5 w-5 bg-red-600 rounded-full mr-2 flex items-center justify-center">
                            <span className="text-white text-xs">!</span>
                          </div>
                          <p className="text-red-800 font-medium">{submitMessage}</p>
                        </div>
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                      disabled={!formData.agreeToTerms || isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        <>
                          Create Account
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>

                    <div className="text-center">
                      <p className="text-sm text-gray-600 text-pretty">
                        Already have an account?{" "}
                        <Link href="/login" className="text-teal-600 hover:text-teal-700 font-medium">
                          Sign in here
                        </Link>
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Benefits Sidebar */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-teal-600 to-blue-600 text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-balance">What You'll Get</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Video className="h-5 w-5 mt-1 text-yellow-300 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Exclusive Video Library</h4>
                        <p className="text-sm text-teal-100 text-pretty">Access to comprehensive training modules</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Headphones className="h-5 w-5 mt-1 text-yellow-300 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Personalized Audio Tracks</h4>
                        <p className="text-sm text-teal-100 text-pretty">Custom hypnosis and meditation sessions</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Award className="h-5 w-5 mt-1 text-yellow-300 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Professional Certification</h4>
                        <p className="text-sm text-teal-100 text-pretty">Internationally recognized credentials</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Users className="h-5 w-5 mt-1 text-yellow-300 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Alumni Community</h4>
                        <p className="text-sm text-teal-100 text-pretty">Lifetime access to our global network</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Shield className="h-6 w-6 text-green-600 mr-3 flex-shrink-0" />
                    <h3 className="font-bold text-balance">Secure & Trusted</h3>
                  </div>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>SSL encrypted registration</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>GDPR compliant data handling</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>30-day money-back guarantee</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>24/7 customer support</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="p-6 text-center">
                  <h3 className="font-bold mb-2 text-balance">Need Help?</h3>
                  <p className="text-sm text-gray-600 mb-4 text-pretty">
                    Have questions about our programs? Our team is here to help you choose the right path.
                  </p>
                  <Link href="/contact">
                    <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700 text-white">
                      Contact Us
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
