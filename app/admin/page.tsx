"use client"

import { useState, useEffect } from "react"
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
  Loader2,
  MessageCircle,
} from "lucide-react"

interface Student {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  stats: {
    totalCourses: number
    completedCourses: number
    activeCourses: number
    averageProgress: number
    totalSpent: number
  }
  enrollments: Array<{
    course: {
      title: string
      category: string
    }
    status: string
    progress: number
  }>
  createdAt: string
  updatedAt: string
}

interface Course {
  id: string
  title: string
  category: string
  price: number
  status: string
  isPublished: boolean
  _count: {
    enrollments: number
    events: number
  }
}

interface DashboardData {
  students: {
    totalStudents: number
    activeStudents: number
    newStudentsThisMonth: number
    totalEnrollments: number
    completedEnrollments: number
    averageProgress: number
    completionRate: number
  }
  blog: {
    totalPosts: number
    publishedPosts: number
    totalViews: number
  }
  upcomingEvents: Array<{
    id: string
    title: string
    startDate: string
    location?: string
  }>
  recentCourses: Course[]
  pendingApprovals: {
    students: number
    courses: number
    payments: number
    testimonials: number
    contacts: number
  }
  recentActivity: Array<{
    id: string
    type: string
    description: string
    timestamp: string
    user: string
  }>
}

export default function AdminDashboard() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [payments, setPayments] = useState<Array<{
    id: string
    studentName: string
    course: string
    amount: number
    status: string
    method: string
    date: string
  }>>([])
  const [pendingStudents, setPendingStudents] = useState<Array<{
    id: string
    studentId: string
    student: {
      id: string
      email: string
      firstName: string
      lastName: string
      phone?: string
      createdAt: string
    }
    status: string
    requestedAt: string
  }>>([])

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('adminToken')
    if (!token) {
      window.location.href = '/admin-login'
      return
    }

    fetchDashboardData()
    fetchStudents()
    fetchCourses()
    fetchPayments()
    fetchPendingStudents()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard')
      const data = await response.json()
      if (data.success) {
        setDashboardData(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStudents = async () => {
    try {
      const response = await fetch('/api/students')
      const data = await response.json()
      if (data.success) {
        setStudents(data.data.students)
      }
    } catch (error) {
      console.error('Failed to fetch students:', error)
    }
  }

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses')
      const data = await response.json()
      if (data.success) {
        setCourses(data.data.courses)
      }
    } catch (error) {
      console.error('Failed to fetch courses:', error)
    }
  }

  const fetchPayments = async () => {
    try {
      // Mock data for now - replace with actual API call
      const mockPayments = [
        {
          id: '1',
          studentName: 'John Doe',
          course: 'NLP Practitioner Certification',
          amount: 2500,
          status: 'completed',
          method: 'Credit Card',
          date: '2024-01-15'
        },
        {
          id: '2',
          studentName: 'Jane Smith',
          course: 'Hypnosis Mastery',
          amount: 1800,
          status: 'pending',
          method: 'Bank Transfer',
          date: '2024-01-16'
        },
        {
          id: '3',
          studentName: 'Mike Johnson',
          course: 'Corporate Training',
          amount: 5000,
          status: 'completed',
          method: 'PayPal',
          date: '2024-01-17'
        }
      ]
      setPayments(mockPayments)
    } catch (error) {
      console.error('Failed to fetch payments:', error)
    }
  }

  const fetchPendingStudents = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      if (!token) return

      const response = await fetch('/api/admin/students/approve', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (data.success) {
        setPendingStudents(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch pending students:', error)
    }
  }

  const handleStudentApproval = async (studentId: string, action: 'approve' | 'reject') => {
    try {
      const token = localStorage.getItem('adminToken')
      if (!token) return

      const response = await fetch('/api/admin/students/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          studentId,
          action
        })
      })

      const data = await response.json()
      if (data.success) {
        // Refresh the pending students list
        fetchPendingStudents()
        // Show success message
        alert(`Student ${action === 'approve' ? 'approved' : 'rejected'} successfully`)
      } else {
        alert(data.message || 'Failed to process approval')
      }
    } catch (error) {
      console.error('Error processing student approval:', error)
      alert('Failed to process approval')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Failed to load dashboard data</p>
          <Button onClick={fetchDashboardData} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    )
  }

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
                  <p className="text-3xl font-bold text-gray-900">{dashboardData.students.totalStudents}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600 flex-shrink-0" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1 flex-shrink-0" />
                <span className="text-sm text-green-600">+{dashboardData.students.newStudentsThisMonth} this month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Courses</p>
                  <p className="text-3xl font-bold text-gray-900">{courses.length}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-green-600 flex-shrink-0" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1 flex-shrink-0" />
                <span className="text-sm text-green-600">{dashboardData.students.totalEnrollments} enrollments</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                  <p className="text-3xl font-bold text-gray-900">{dashboardData.students.completionRate}%</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-purple-600 flex-shrink-0" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1 flex-shrink-0" />
                <span className="text-sm text-green-600">{dashboardData.students.averageProgress}% avg progress</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Blog Views</p>
                  <p className="text-3xl font-bold text-gray-900">{dashboardData.blog.totalViews.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-yellow-600 flex-shrink-0" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1 flex-shrink-0" />
                <span className="text-sm text-green-600">{dashboardData.blog.publishedPosts} published posts</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Approvals Alert */}
        {dashboardData.pendingApprovals && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-bold">!</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-orange-800">Pending Approvals</h3>
                    <p className="text-sm text-orange-700">
                      {Object.values(dashboardData.pendingApprovals).reduce((a, b) => a + b, 0)} items need your attention
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {dashboardData.pendingApprovals.students > 0 && (
                    <Badge className="bg-orange-100 text-orange-800">
                      {dashboardData.pendingApprovals.students} Students
                    </Badge>
                  )}
                  {dashboardData.pendingApprovals.payments > 0 && (
                    <Badge className="bg-orange-100 text-orange-800">
                      {dashboardData.pendingApprovals.payments} Payments
                    </Badge>
                  )}
                  {dashboardData.pendingApprovals.testimonials > 0 && (
                    <Badge className="bg-orange-100 text-orange-800">
                      {dashboardData.pendingApprovals.testimonials} Testimonials
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="approvals">Approvals</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData.recentActivity?.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{activity.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">{activity.user}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">{activity.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData.upcomingEvents?.map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-sm">{event.title}</h4>
                          <p className="text-xs text-gray-600">
                            {new Date(event.startDate).toLocaleDateString()}
                            {event.location && ` • ${event.location}`}
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

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
                            <div className="font-medium">{student.firstName} {student.lastName}</div>
                            <div className="text-sm text-gray-500">{student.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {student.enrollments.map((enrollment, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {enrollment.course.title}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${student.stats.averageProgress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm">{student.stats.averageProgress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={student.stats.totalSpent > 0 ? "default" : "destructive"}
                            className={student.stats.totalSpent > 0 ? "bg-green-100 text-green-800" : ""}
                          >
                            {student.stats.totalSpent > 0 ? "paid" : "pending"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {new Date(student.updatedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" onClick={() => setSelectedStudent(student)}>
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
                          <h3 className="text-lg font-semibold text-balance">{course.title}</h3>
                          <Badge variant={course.isPublished ? "default" : "secondary"}>
                            {course.isPublished ? "Published" : "Draft"}
                          </Badge>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Students:</span>
                            <span className="font-medium">{course._count.enrollments}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Category:</span>
                            <span className="font-medium">{course.category}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Price:</span>
                            <span className="font-medium">${course.price.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Events:</span>
                            <span className="font-medium">{course._count.events}</span>
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

          {/* Approvals Tab */}
          <TabsContent value="approvals">
            <div className="space-y-6">
              {/* Pending Student Registrations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Pending Student Registrations ({pendingStudents.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {pendingStudents.length === 0 ? (
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No pending student registrations</p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Registration Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pendingStudents.map((approval) => (
                          <TableRow key={approval.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">
                                  {approval.student.firstName} {approval.student.lastName}
                                </div>
                                <div className="text-sm text-gray-500">
                                  ID: {approval.student.id.slice(0, 8)}...
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{approval.student.email}</TableCell>
                            <TableCell>{approval.student.phone || 'N/A'}</TableCell>
                            <TableCell>
                              {new Date(approval.student.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button 
                                  size="sm" 
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => handleStudentApproval(approval.studentId, 'approve')}
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-red-600 hover:bg-red-50"
                                  onClick={() => handleStudentApproval(approval.studentId, 'reject')}
                                >
                                  Reject
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>

              {/* Pending Payments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    Pending Payments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Sarah Johnson</TableCell>
                        <TableCell>NLP Practitioner Certification</TableCell>
                        <TableCell>$1,299.00</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell>2024-01-20</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600">
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Pending Testimonials */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-purple-600" />
                    Pending Testimonials
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium">Michael Chen</h4>
                          <p className="text-sm text-gray-600">NLP Practitioner Graduate</p>
                        </div>
                        <Badge variant="outline">Pending Review</Badge>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">
                        "The NLP training completely transformed my communication skills. I now feel confident in any professional setting. Highly recommended!"
                      </p>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600">
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Form Submissions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-orange-600" />
                    Contact Form Submissions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Lisa Rodriguez</TableCell>
                        <TableCell>lisa.rodriguez@email.com</TableCell>
                        <TableCell>Corporate Training Inquiry</TableCell>
                        <TableCell>
                          <Badge variant="outline">Corporate Training</Badge>
                        </TableCell>
                        <TableCell>2024-01-20</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              <Mail className="h-4 w-4 mr-1" />
                              Respond
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-green-600">
                              Mark Resolved
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
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
