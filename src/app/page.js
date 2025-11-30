"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "branch") {
        router.push("/dashboard/branch")
      } else if (user.role === "company") {
        router.push("/dashboard/company")
      }
    }
  }, [isAuthenticated, user, router])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 border border-blue-200 mb-6">
          <div className="w-8 h-8 rounded-full bg-blue-500"></div>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 text-gray-900">Dashboard System</h1>
        <p className="text-lg text-gray-600 mb-8">
          A modern role-based dashboard with Branch and Company management built with Next.js and Tailwind CSS.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/login">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">Sign In</Button>
          </Link>
        </div>
        <p className="text-sm text-gray-500 mt-8">
          Demo credentials: Try logging in as either <strong>Branch</strong> or <strong>Company</strong> user.
        </p>
      </div>
    </div>
  )
}
