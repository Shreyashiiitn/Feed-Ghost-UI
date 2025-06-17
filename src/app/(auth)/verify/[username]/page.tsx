"use client"

import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import type { ApiResponse } from "@/types/ApiResponse"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { type AxiosError } from "axios"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import type * as z from "zod"
import { verifySchema } from "@/Schemas/verifySchema"
import { Shield, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function VerifyAccount() {
  const router = useRouter()
  const params = useParams<{ username: string }>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  })

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    setIsSubmitting(true)
    try {
      const response = await axios.post<ApiResponse>(`/api/verify-code`, {
        username: params.username,
        code: data.code,
      })

      toast.success(response.data.message)
      router.replace("/sign-in")
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(axiosError.response?.data.message ?? "An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Main form container */}
      <div className="relative w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 space-y-8">
          {/* Back button */}
          <div className="absolute top-6 left-6">
            <Link
              href="/sign-up"
              className="inline-flex items-center text-gray-300 hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span className="text-sm">Back</span>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center space-y-4 pt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Verify Your Account
            </h1>
            <div className="space-y-2">
              <p className="text-gray-300 text-sm">We've sent a verification code to your email</p>
              {params.username && <p className="text-violet-400 text-sm font-medium">Welcome, {params.username}!</p>}
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Verification Code Field */}
              <FormField
                name="code"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-gray-200 text-sm font-medium">Verification Code</FormLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        className="text-center text-2xl font-mono tracking-widest bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-violet-400 focus:ring-violet-400/20 rounded-xl h-14 transition-all duration-200"
                        placeholder="000000"
                        maxLength={6}
                        autoComplete="one-time-code"
                      />
                    </div>
                    <p className="text-gray-400 text-xs text-center">Enter the 6-digit code from your email</p>
                    <FormMessage className="text-red-400 text-sm text-center" />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Verifying...</span>
                  </div>
                ) : (
                  "Verify Account"
                )}
              </Button>
            </form>
          </Form>

          {/* Footer */}
          <div className="text-center pt-4 border-t border-white/10 space-y-3">
            <p className="text-gray-300 text-sm">
              Didn't receive the code?{" "}
              <button
                type="button"
                className="text-violet-400 hover:text-violet-300 font-medium transition-colors duration-200 hover:underline"
                onClick={() => toast.info("Resend functionality coming soon!")}
              >
                Resend code
              </button>
            </p>
            <p className="text-gray-400 text-xs">Check your spam folder if you don't see the email</p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-violet-500/20 rounded-full blur-sm"></div>
        <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-purple-500/20 rounded-full blur-sm"></div>
      </div>
    </div>
  )
}
