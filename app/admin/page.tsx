"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  Mail,
  CheckCircle,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
} from "lucide-react"

export default function AdminDashboard() {
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data - in real app this would come from your database
  const students = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      enrolledCourses: ["NLP Practitioner", "Corporate Training"],
      progress: 75,
      paymentStatus: "paid",
      joinDate: "2024-01-15",
      lastActive: "2024-01-20",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+1 (555) 987-6543",
      enrolledCourses: ["Train the Trainer"],
      progress: 45,
      paymentStatus: "pending",
      joinDate: "2024-01-10",
      lastActive: "2024-01-19",
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "michael@example.com",
      phone: "+1 (555) 456-7890",
      enrolledCourses: ["Master Practitioner", "DEI Training"],
      progress: 90,
      paymentStatus: "paid",
      joinDate: "2023-12-20",
      lastActive: "2024-01-21",
    },
  ]

  const courses = [
    {
      id: 1,
      name: "NLP Practitioner",
      students: 45,
      completionRate: 78,
      revenue: 112425,
      status: "active",
    },
    {
      id: 2,
      name: "Master Practitioner",
      students: 32,
      completionRate: 85,
      revenue: 127840,
      status: "active",
    },
    {
      id: 3,
      name: "Train the Trainer",
      students: 28,
      completionRate: 72,
      revenue: 97860,
      status: "active",
    },
  ]

  const payments = [
    {
      id: 1,
      studentName: "John Smith",
      course: "NLP Practitioner",
      amount: 2497,
      status: "completed",
      date: "2024-01-15",
      method: "Credit Card",
    },
    {
      id: 2,
      studentName: "Sarah Johnson",
      course: "Train the Trainer",
      amount: 3497,
      status: "pending",
      date: "2024-01-10",
      method: "Bank Transfer",
    },
    {
      id: 3,
      studentName: "Michael Chen",
      course: "Master Practitioner",
      amount: 3997,
      status: "completed",
      date: "2023-12-20",
      method: "PayPal",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-balance">Admin Dashboard</h1>
          <p className="text-gray-600 text-pretty">Manage students, courses, and track performance</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-3xl font-bold text-gray-900">247</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600 flex-shrink-0" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1 flex-shrink-0" />
                <span className="text-sm text-green-600">+12% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Courses</p>
                  <p className="text-3xl font-bold text-gray-900">8</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-green-600 flex-shrink-0" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1 flex-shrink-0" />
                <span className="text-sm text-green-600">2 new this month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">$45,280</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-yellow-600 flex-shrink-0" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1 flex-shrink-0" />
                <span className="text-sm text-green-600">+8% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                  <p className="text-3xl font-bold text-gray-900">78%</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-purple-600 flex-shrink-0" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1 flex-shrink-0" />
                <span className="text-sm text-green-600">+3% from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Students Tab */}
          <TabsContent value="students">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-balance">Student Management</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 flex-shrink-0" />
                      <Input
                        placeholder="Search students..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2 flex-shrink-0" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2 flex-shrink-0" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Courses</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Payment Status</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {student.enrolledCourses.map((course, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {course}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${student.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm">{student.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={student.paymentStatus === "paid" ? "default" : "destructive"}
                            className={student.paymentStatus === "paid" ? "bg-green-100 text-green-800" : ""}
                          >
                            {student.paymentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">{student.lastActive}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4 flex-shrink-0" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Mail className="h-4 w-4 flex-shrink-0" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4 flex-shrink-0" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <CardTitle className="text-balance">Course Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <Card key={course.id} className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-balance">{course.name}</h3>
                          <Badge variant="secondary">{course.status}</Badge>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Students:</span>
                            <span className="font-medium">{course.students}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Completion Rate:</span>
                            <span className="font-medium">{course.completionRate}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Revenue:</span>
                            <span className="font-medium">${course.revenue.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="mt-4 flex space-x-2">
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            <Eye className="h-4 w-4 mr-2 flex-shrink-0" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            <Edit className="h-4 w-4 mr-2 flex-shrink-0" />
                            Edit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle className="text-balance">Payment Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.studentName}</TableCell>
                        <TableCell>{payment.course}</TableCell>
                        <TableCell>${payment.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge
                            variant={payment.status === "completed" ? "default" : "destructive"}
                            className={payment.status === "completed" ? "bg-green-100 text-green-800" : ""}
                          >
                            {payment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>{payment.method}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {payment.status === "pending" && (
                              <Button variant="outline" size="sm">
                                <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                                Approve
                              </Button>
                            )}
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4 flex-shrink-0" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-balance">Course Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="enrollment">Auto-enrollment</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate after payment</SelectItem>
                        <SelectItem value="manual">Manual approval</SelectItem>
                        <SelectItem value="scheduled">Scheduled batches</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="notifications">Email Notifications</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="daily">Daily digest</SelectItem>
                        <SelectItem value="weekly">Weekly summary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">Save Settings</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-balance">System Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">System Status:</span>
                    <Badge className="bg-green-100 text-green-800">Online</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Last Backup:</span>
                    <span className="text-sm">2024-01-21 03:00 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Database Size:</span>
                    <span className="text-sm">2.4 GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Active Sessions:</span>
                    <span className="text-sm">47</span>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Download className="h-4 w-4 mr-2 flex-shrink-0" />
                    Export Data
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
