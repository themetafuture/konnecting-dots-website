"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, ArrowLeft, CheckCircle, Clock, Shield } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            <Card className="shadow-xl text-center">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold mb-4 text-balance">Check Your Email</h1>
                <p className="text-gray-600 mb-6 text-pretty">
                  We've sent password reset instructions to <strong>{email}</strong>
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-left">
                      <h3 className="font-semibold text-blue-800 mb-1">What's next?</h3>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Check your email inbox (and spam folder)</li>
                        <li>• Click the reset link in the email</li>
                        <li>• Create a new secure password</li>
                        <li>• Sign in with your new password</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button onClick={() => setIsSubmitted(false)} variant="outline" className="w-full bg-transparent">
                    Send Another Email
                  </Button>
                  <Link href="/login">
                    <Button className="w-full bg-teal-600 hover:bg-teal-700">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Sign In
                    </Button>
                  </Link>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-pretty">
                    Didn't receive the email? Check your spam folder or{" "}
                    <Link href="/contact" className="text-teal-600 hover:text-teal-700 underline">
                      contact support
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-10 w-10 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2 text-balance">Reset Your Password</h1>
            <p className="text-gray-600 text-pretty">
              Enter your email address and we'll send you instructions to reset your password
            </p>
          </div>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-balance">Forgot Password</CardTitle>
              <p className="text-gray-600 text-center text-pretty">
                No worries, we'll help you get back into your account
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your registered email"
                    required
                    className="mt-1"
                  />
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Clock className="mr-2 h-4 w-4 animate-spin" />
                      Sending Instructions...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Reset Instructions
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <Link
                    href="/login"
                    className="text-sm text-gray-600 hover:text-gray-800 flex items-center justify-center"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Sign In
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <Card className="mt-6 bg-gray-50 border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Security Notice</h3>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p className="text-pretty">
                      For your security, password reset links expire after 1 hour and can only be used once.
                    </p>
                    <p className="text-pretty">
                      If you don't receive the email within a few minutes, please check your spam folder or{" "}
                      <Link href="/contact" className="text-teal-600 hover:text-teal-700 underline">
                        contact our support team
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Help Section */}
          <div className="mt-8 text-center">
            <h3 className="font-semibold mb-4 text-balance">Need Additional Help?</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/contact">
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Contact Support
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
