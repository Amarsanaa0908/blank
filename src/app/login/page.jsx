"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Mail, Lock } from "lucide-react"
import { useAuth } from "@/lib/auth-context"


export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("салбар")
  const [isLoading, setIsLoading] = useState(false)
  const { setUser } = useAuth()
  const router = useRouter()

  console.log(role)

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setUser({
        id: "user-123",
        name: email.split("@")[0],
        email,
        role,
      })
      setIsLoading(false)
      console.log("novsh", role)
      router.push(role === "салбар" ? "/dashboard/branch" : "/dashboard/company")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-border bg-card shadow-sm">
        <div className="p-8">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Сайн байна уу</h1>
            <p className="text-sm text-muted-foreground mt-1">Нэвтрэх</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">
                Имэйл хаяг
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-input border-border"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-foreground font-medium">
                  Нууц үг
                </Label>
                <Link href="#" className="text-xs text-primary hover:text-primary/80 transition-colors">
                  Мартсан?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-input border-border"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground font-medium">Төрөл</Label>
              <div className="flex gap-3">
                {(["салбар", "толгой"]).map((r) => (
                  <label key={r} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value={r}
                      checked={role === r}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-4 h-4 text-primary cursor-pointer"
                    />
                    <span className="ml-2 text-sm text-foreground capitalize">{r}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium mt-6"
            >
              {isLoading ? "Нэвтэрч байна..." : "Нэвтрэх"}
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground mt-6">
            Бүртгэлгүй юу?{" "}
            <Link href="/signup" className="text-primary hover:text-primary/80 font-medium transition-colors">
              Бүртгүүлэх
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}
