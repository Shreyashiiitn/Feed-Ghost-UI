"use client"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "./ui/button"
import type { User } from "next-auth"
import { LogOut, UserIcon, Ghost, Loader2 } from "lucide-react"

function Navbar() {
  const sessionResult = useSession()

  // Handle case where useSession returns undefined
  if (!sessionResult) {
    return (
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-violet-900/80 via-purple-900/80 to-indigo-900/80 border-b border-white/10 shadow-2xl">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex justify-center items-center">
            <Loader2 className="w-6 h-6 text-white animate-spin" />
          </div>
        </div>
      </nav>
    )
  }

  const { data: session, status } = sessionResult
  const user: User | undefined = session?.user

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-violet-900/80 via-purple-900/80 to-indigo-900/80 border-b border-white/10 shadow-2xl">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Logo */}
          <Link href="/" className="group flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl group-hover:scale-110 transition-transform duration-200">
              <Ghost className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-violet-200 group-hover:to-purple-200 transition-all duration-200">
              Feed_Ghost
            </span>
          </Link>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {status === "loading" ? (
              <div className="flex items-center space-x-2 text-gray-300">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Loading...</span>
              </div>
            ) : session && user ? (
              <>
                {/* Welcome Message */}
                <div className="hidden md:flex items-center space-x-3 px-4 py-2 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg">
                    <UserIcon className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-300">Welcome back,</p>
                    <p className="text-white font-medium">{user.username || user.email || "User"}</p>
                  </div>
                </div>

                {/* Mobile Welcome */}
                <div className="md:hidden text-center">
                  <p className="text-gray-300 text-sm">Welcome back,</p>
                  <p className="text-white font-medium">{user.username || user.email || "User"}</p>
                </div>

                {/* Logout Button */}
                <Button
                  onClick={() => signOut()}
                  className="group relative overflow-hidden bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white font-medium px-4 py-2 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95"
                  variant="outline"
                >
                  <div className="flex items-center space-x-2">
                    <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
                    <span>Logout</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl"></div>
                </Button>
              </>
            ) : (
              <Link href="/sign-in">
                <Button className="group relative overflow-hidden bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
                  <div className="flex items-center space-x-2">
                    <UserIcon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                    <span>Login</span>
                  </div>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl"></div>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Decorative gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"></div>
    </nav>
  )
}

export default Navbar
