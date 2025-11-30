import { ProtectedRoute } from "@/components/protected-route";



export default function BranchLayout({children}) {
  return <ProtectedRoute requiredRole="салбар">{children}</ProtectedRoute>
}
