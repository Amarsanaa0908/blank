"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function ProtectedRoute({ children, requiredRole }) {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    if (requiredRole && user?.role !== requiredRole) {
      router.push("/login")
    }
  }, [isAuthenticated, user?.role, requiredRole, router])

  if (!isAuthenticated || (requiredRole && user?.role !== requiredRole)) {
    return null
  }

  return children
}
