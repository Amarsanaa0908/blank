import { ProtectedRoute } from "@/components/protected-route"

export default function CompanyLayout({children}) {
  return <ProtectedRoute requiredRole="толгой">{children}</ProtectedRoute>
}
