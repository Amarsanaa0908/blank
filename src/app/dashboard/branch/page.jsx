"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LogOut, Bell, Settings, Menu, X, TrendingUp, Users, DollarSign, Activity } from "lucide-react"
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

export default function BranchDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const stats = [
    { label: "Нийт брлуулалт", value: "$12,450", change: "+8.2%", icon: DollarSign },
    { label: "Харилцагчид", value: "584", change: "+3.5%", icon: Users },
    { label: "Захиалга", value: "342", change: "+12.1%", icon: TrendingUp },
    { label: "Идэвхтэй", value: "89", change: "+5.3%", icon: Activity },
  ]

  const lineChartData = [
    { day: "Дав", sales: 2400 },
    { day: "Мяг", sales: 1398 },
    { day: "Лха", sales: 2800 },
    { day: "Пүр", sales: 3800 },
    { day: "Баа", sales: 3908 },
    { day: "Бям", sales: 4800 },
    { day: "Ням", sales: 3800 },
  ]

  const barChartData = [
    { category: "Electronics", amount: 4000 },
    { category: "Clothing", amount: 3000 },
    { category: "Food", amount: 2000 },
    { category: "Other", amount: 2780 },
  ]

  const pieChartData = [
    { name: "Цахим", value: 65 },
    { name: "Биетээр", value: 35 },
  ]

  const COLORS = ["hsl(var(--color-chart-1))", "hsl(var(--color-chart-2))"]

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
              B
            </div>
            <span className="font-bold text-lg text-foreground">Салбар</span>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {[
            { name: "Дашбоард", active: true },
            { name: "Агуулах" },
            { name: "Борлуулалт" },
            { name: "Харилагчид" },
            { name: "Тайлан" },
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
            <h1 className="text-2xl font-bold text-foreground">Салбарын дашбоард</h1>
            <p className="text-sm text-muted-foreground">Нэвтэрсэн бүртгэл - {user?.name}</p>
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
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, i) => {
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
                    <p className="text-xs font-medium text-green-600">{stat.change} өнгөрсөн долоо хоногтой харьцуулахад</p>
                  </Card>
                )
              })}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Line Chart - Weekly Sales */}
              <Card className="border-border bg-card p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-4 text-foreground">Долоо хоногийн борлуулалт (мянга)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={lineChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
                    <XAxis dataKey="day" stroke="hsl(var(--color-muted-foreground))" />
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

              {/* Bar Chart - Sales by Category */}
              <Card className="border-border bg-card p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-4 text-foreground">Борлуулалт (төрлөөр)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
                    <XAxis dataKey="category" stroke="hsl(var(--color-muted-foreground))" />
                    <YAxis stroke="hsl(var(--color-muted-foreground))" />
                    <Tooltip />
                    <Bar dataKey="amount" fill="hsl(var(--color-secondary))" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Pie Chart and Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="border-border bg-card p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-4 text-foreground">Борлуулалт (сувгаар)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
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

              {/* Recent Orders */}
              <Card className="lg:col-span-2 border-border bg-card p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-4 text-foreground">Сүүлийн захиалгууд</h3>
                <div className="space-y-4">
                  {[
                    { id: "#ORD001", customer: "Бат Туяа", amount: "$245.00", status: "Амжилттай" },
                    { id: "#ORD002", customer: "Балбар Дорж", amount: "$189.50", status: "Амжилттай" },
                    { id: "#ORD003", customer: "Ариунаа Цог", amount: "$356.75", status: "Хүлээгдэж байгаа" },
                  ].map((order, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted border border-border"
                    >
                      <div>
                        <p className="font-medium text-sm text-foreground">
                          {order.id} - {order.customer}
                        </p>
                        <p className="text-xs text-muted-foreground">{order.amount}</p>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === "Амжилттай" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.status}
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
