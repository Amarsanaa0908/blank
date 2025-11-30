"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LogOut, Bell, Settings, Menu, X, TrendingUp, Building2, DollarSign, Activity } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
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

export default function CompanyDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedBranch, setSelectedBranch] = useState(0)
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  // Company-wide stats
  const companyStats = [
    { label: "Total Revenue", value: "$145,320", change: "+15.3%", icon: DollarSign },
    { label: "Active Branches", value: "8", change: "+1", icon: Building2 },
    { label: "Total Orders", value: "2,847", change: "+22.1%", icon: TrendingUp },
    { label: "Active Users", value: "456", change: "+8.2%", icon: Activity },
  ]

  // Branch data
  const branches = [
    {
      name: "Шангри-Ла салбар",
      city: "Улаанбаатар",
      sales: 45230,
      orders: 342,
      customers: 584,
    },
    {
      name: "Блю Скай салбар",
      city: "Улаанбаатар",
      sales: 38920,
      orders: 298,
      customers: 467,
    },
    {
      name: "Централ тауэр салбар",
      city: "Улаанбаатар",
      sales: 32450,
      orders: 267,
      customers: 381,
    },
    {
      name: "УИД салбар",
      city: "Улаанбаатар",
      sales: 28720,
      orders: 215,
      customers: 319,
    },
  ]

  // Overall company sales trend
  const companySalesData = [
    { month: "1", sales: 95000 },
    { month: "2", sales: 102000 },
    { month: "3", sales: 98000 },
    { month: "4", sales: 115000 },
    { month: "5", sales: 128000 },
    { month: "6", sales: 145320 },
  ]

  // Branch comparison
  const branchComparisonData = branches.map((b) => ({
    name: b.name.split(" ")[0],
    sales: b.sales,
  }))

  // Branch distribution
  const branchDistributionData = branches.map((b) => ({
    name: b.name.split(" ")[0],
    value: b.orders,
  }))

  const COLORS = [
    "hsl(var(--color-chart-1))",
    "hsl(var(--color-chart-2))",
    "hsl(var(--color-chart-3))",
    "hsl(var(--color-chart-4))",
  ]

  const selectedBranchData = branches[selectedBranch]

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
              C
            </div>
            <span className="font-bold text-lg text-foreground">Толгой компани</span>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {[
            { name: "Дашбоард", active: true },
            { name: "Салбарууд" },
            { name: "Аналитик" },
            { name: "Тайлан" },
            { name: "Тохиргоо" },
          ].map((item) => (
            <button
              key={item.name}
              className={`w-full text-left px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                item.active
                  ? "bg-primary/10 text-primary border border-primary"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-border">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-border text-foreground hover:bg-muted justify-start bg-card"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Гарах
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
            <h1 className="text-2xl font-bold text-foreground">Компани дашбоард</h1>
            <p className="text-sm text-muted-foreground">Толгой компани - {user?.name}</p>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-muted rounded-lg transition-colors text-foreground relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-muted rounded-lg transition-colors text-foreground">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Company Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {companyStats.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <Card key={i} className="border-border bg-card p-6 shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                        <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <p className="text-xs font-medium text-green-600">{stat.change} өнгөрсөн сартай харьцуулахад</p>
                  </Card>
                )
              })}
            </div>

            {/* Company-wide Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Line Chart - Company Revenue Trend */}
              <Card className="border-border bg-card p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-4 text-foreground">Орлогын трэнд</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={companySalesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--color-muted-foreground))" />
                    <YAxis stroke="hsl(var(--color-muted-foreground))" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="hsl(var(--color-primary))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--color-primary))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              {/* Bar Chart - Branch Comparison */}
              <Card className="border-border bg-card p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-4 text-foreground">Борлуулалт (салбараар)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={branchComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--color-muted-foreground))" />
                    <YAxis stroke="hsl(var(--color-muted-foreground))" />
                    <Tooltip />
                    <Bar dataKey="sales" fill="hsl(var(--color-secondary))" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Pie Chart and Branch Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card className="border-border bg-card p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-4 text-foreground">Захиалгын хүргэлт</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={branchDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {branchDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>

              {/* Branches List */}
              <Card className="lg:col-span-2 border-border bg-card p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-4 text-foreground">Бүх салбар</h3>
                <div className="space-y-3">
                  {branches.map((branch, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedBranch(i)}
                      className={`w-full text-left p-4 rounded-lg border transition-all ${
                        selectedBranch === i
                          ? "bg-primary/10 border-primary"
                          : "bg-muted border-border hover:border-border"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm text-foreground">{branch.name}</p>
                          <p className="text-xs text-muted-foreground">{branch.city}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm text-foreground">${(branch.sales / 1000).toFixed(0)}k</p>
                          <p className="text-xs text-muted-foreground">{branch.orders} orders</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>
            </div>

            {/* Selected Branch Details */}
            <Card className="border-border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-6 text-foreground">{selectedBranchData.name} - Дэлгэрэнгүй</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-lg bg-muted border border-border">
                  <p className="text-sm text-muted-foreground font-medium">Нийт борлуулалт</p>
                  <p className="text-2xl font-bold text-foreground mt-2">
                    ${(selectedBranchData.sales / 1000).toFixed(1)}k
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted border border-border">
                  <p className="text-sm text-muted-foreground font-medium">Захиалга</p>
                  <p className="text-2xl font-bold text-foreground mt-2">{selectedBranchData.orders}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted border border-border">
                  <p className="text-sm text-muted-foreground font-medium">Харилцагчид</p>
                  <p className="text-2xl font-bold text-foreground mt-2">{selectedBranchData.customers}</p>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
