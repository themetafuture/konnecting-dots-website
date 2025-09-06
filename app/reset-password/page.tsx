"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, CheckCircle, Shield, Lock, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle password reset
    setIsSuccess(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const passwordRequirements = [
    { text: "At least 8 characters long", met: formData.password.length >= 8 },
    { text: "Contains uppercase letter", met: /[A-Z]/.test(formData.password) },
    { text: "Contains lowercase letter", met: /[a-z]/.test(formData.password) },
    { text: "Contains a number", met: /\d/.test(formData.password) },
    { text: "Contains special character", met: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password) },
  ]

  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword.length > 0

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-green-50 to-teal-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            <Card className="shadow-xl text-center">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold mb-4 text-balance">Password Reset Successful!</h1>
                <p className="text-gray-600 mb-6 text-pretty">
                  Your password has been successfully updated. You can now sign in with your new password.
                </p>

                <Link href="/login">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Sign In Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 text-pretty">
                    For security reasons, you've been signed out of all devices. Please sign in again.
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
              <Lock className="h-10 w-10 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2 text-balance">Create New Password</h1>
            <p className="text-gray-600 text-pretty">Choose a strong password to secure your account</p>
          </div>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-balance">Reset Password</CardTitle>
              <p className="text-gray-600 text-center text-pretty">
                Your new password must be different from your previous password
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="password">New Password</Label>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your new password"
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
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative mt-1">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your new password"
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
                  {formData.confirmPassword && !passwordsMatch && (
                    <p className="text-sm text-red-600 mt-1">Passwords do not match</p>
                  )}
                  {passwordsMatch && (
                    <p className="text-sm text-green-600 mt-1 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1 flex-shrink-0" />
                      Passwords match
                    </p>
                  )}
                </div>

                {/* Password Requirements */}
                {formData.password && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">Password Requirements:</h4>
                    <div className="space-y-2">
                      {passwordRequirements.map((req, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <CheckCircle
                            className={`h-4 w-4 mr-2 flex-shrink-0 ${req.met ? "text-green-500" : "text-gray-300"}`}
                          />
                          <span className={req.met ? "text-green-700" : "text-gray-600"}>{req.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={!passwordsMatch || !passwordRequirements.every((req) => req.met)}
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Update Password
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <Card className="mt-6 bg-gray-50 border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Security Tips</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• Use a unique password you haven't used before</p>
                    <p>• Consider using a password manager</p>
                    <p>• Don't share your password with anyone</p>
                    <p>• Sign out of public or shared devices</p>
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
