"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LogOut, Bell, Settings, Menu, X, TrendingUp, Users, BarChart3, Activity } from "lucide-react"
import Link from "next/link"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardPage() {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    if (user?.role === "branch") {
      router.push("/dashboard/branch")
    } else if (user?.role === "company") {
      router.push("/dashboard/company")
    }
  }, [isAuthenticated, user, router])

  const stats = [
    { label: "Total Revenue", value: "$45,231", change: "+12.5%", icon: TrendingUp },
    { label: "Users", value: "2,431", change: "+4.3%", icon: Users },
    { label: "Conversions", value: "1,247", change: "+8.1%", icon: BarChart3 },
    { label: "Active Sessions", value: "438", change: "+2.2%", icon: Activity },
  ]

  const lineChartData = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 3000 },
    { month: "Mar", revenue: 2000 },
    { month: "Apr", revenue: 2780 },
    { month: "May", revenue: 1890 },
    { month: "Jun", revenue: 2390 },
  ]

  const barChartData = [
    { name: "Product A", sales: 4000 },
    { name: "Product B", sales: 3000 },
    { name: "Product C", sales: 2000 },
    { name: "Product D", sales: 2780 },
  ]

  const pieChartData = [
    { name: "Direct", value: 400 },
    { name: "Organic", value: 300 },
    { name: "Referral", value: 200 },
    { name: "Social", value: 100 },
  ]

  const COLORS = [
    "hsl(var(--color-chart-1))",
    "hsl(var(--color-chart-2))",
    "hsl(var(--color-chart-3))",
    "hsl(var(--color-chart-4))",
  ]

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } bg-card border-r border-border transition-all duration-300 overflow-hidden flex flex-col`}
      >
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm">
              V
            </div>
            <span className="font-bold text-lg text-foreground">v0</span>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {[
            { name: "Dashboard", active: true },
            { name: "Analytics" },
            { name: "Reports" },
            { name: "Settings" },
            { name: "Help" },
          ].map((item) => (
            <Link
              key={item.name}
              href="#"
              className={`block px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                item.active
                  ? "bg-primary/10 text-primary border border-primary"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-border">
          <Button
            variant="outline"
            className="w-full border-border text-foreground hover:bg-muted justify-start bg-card"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-muted rounded-lg transition-colors text-foreground"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex-1 mx-8">
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-muted rounded-lg transition-colors text-foreground relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-muted rounded-lg transition-colors text-foreground">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 rounded-full bg-primary"></div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <Card key={i} className="border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                        <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <p className="text-xs font-medium text-green-600">{stat.change} from last month</p>
                  </Card>
                )
              })}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Line Chart */}
              <Card className="border-border bg-card p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-4 text-foreground">Revenue Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={lineChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--color-muted-foreground))" />
                    <YAxis stroke="hsl(var(--color-muted-foreground))" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(var(--color-primary))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--color-primary))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              {/* Bar Chart */}
              <Card className="border-border bg-card p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-4 text-foreground">Sales by Product</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--color-muted-foreground))" />
                    <YAxis stroke="hsl(var(--color-muted-foreground))" />
                    <Tooltip />
                    <Bar dataKey="sales" fill="hsl(var(--color-secondary))" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Pie Chart and Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Pie Chart */}
              <Card className="border-border bg-card p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-4 text-foreground">Traffic Sources</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>

              {/* Recent Activity */}
              <Card className="lg:col-span-2 border-border bg-card p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-4 text-foreground">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { time: "2 hours ago", action: "New user registered", status: "success" },
                    { time: "4 hours ago", action: "Payment processed", status: "success" },
                    { time: "6 hours ago", action: "Report generated", status: "pending" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted border border-border hover:bg-muted/70 transition-colors"
                    >
                      <div>
                        <p className="font-medium text-sm text-foreground">{item.action}</p>
                        <p className="text-xs text-muted-foreground">{item.time}</p>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === "success" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.status}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
