"use client"

import { useState } from "react"
import axios, { type AxiosError } from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Loader2, MessageSquare, Send, Sparkles, UserPlus, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { useCompletion } from "ai/react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import type * as z from "zod"
import type { ApiResponse } from "@/types/ApiResponse"
import Link from "next/link"
import { useParams } from "next/navigation"
import { messageSchema } from "@/Schemas/messageSchema"

const specialChar = "||"

const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar)
}

const initialMessageString = "What's your favorite movie?||Do you have any pets?||What's your dream job?"

export default function SendMessage() {
  const params = useParams<{ username: string }>()
  const username = params.username
  const [copied, setCopied] = useState(false)

  const {
    complete,
    completion,
    isLoading: isSuggestLoading,
    error,
  } = useCompletion({
    api: "/api/suggest-messages",
    initialCompletion: initialMessageString,
  })

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  })

  const messageContent = form.watch("content")

  const handleMessageClick = (message: string) => {
    form.setValue("content", message)
  }

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true)
    try {
      const response = await axios.post<ApiResponse>("/api/send-message", {
        ...data,
        username,
      })

      toast.success(response.data.message)
      form.reset({ content: "" })
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(axiosError.response?.data.message ?? "Failed to send message")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchSuggestedMessages = async () => {
    try {
      complete("")
    } catch (error) {
      console.error("Error fetching messages:", error)
    }
  }

  const copyProfileLink = async () => {
    const profileLink = `${window.location.origin}/u/${username}`
    try {
      await navigator.clipboard.writeText(profileLink)
      setCopied(true)
      toast.success("Profile link copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error("Failed to copy link")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative container mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 pt-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl mb-4">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Send Anonymous Message
          </h1>
          <p className="text-gray-300 text-lg">to @{username}</p>

          {/* Profile Link Card */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl p-4 max-w-md mx-auto">
            <div className="flex items-center justify-between space-x-3">
              <div className="flex-1 text-left">
                <p className="text-gray-300 text-sm">Public Profile Link</p>
                <p className="text-white font-mono text-sm truncate">
                  {typeof window !== "undefined" ? `${window.location.origin}/u/${username}` : `/u/${username}`}
                </p>
              </div>
              <Button
                onClick={copyProfileLink}
                size="sm"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white"
                variant="outline"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-gray-200 text-lg font-medium">Your Anonymous Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your anonymous message here..."
                        className="min-h-32 bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-violet-400 focus:ring-violet-400/20 rounded-xl resize-none text-base"
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />

              <div className="flex justify-center">
                <Button
                  type="submit"
                  disabled={isLoading || !messageContent}
                  className="group relative overflow-hidden bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                      <span>Send Message</span>
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* Suggested Messages */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 space-y-6">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Need Inspiration?
            </h3>
            <p className="text-gray-300">Click on any message below to use it, or generate new suggestions</p>

            <Button
              onClick={fetchSuggestedMessages}
              disabled={isSuggestLoading}
              className="group relative overflow-hidden bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium px-6 py-2 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95"
              variant="outline"
            >
              {isSuggestLoading ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Generating...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform duration-200" />
                  <span>Suggest Messages</span>
                </div>
              )}
            </Button>
          </div>

          <Card className="bg-white/5 border-white/20 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <h4 className="text-lg font-semibold text-white">Message Suggestions</h4>
            </CardHeader>
            <CardContent className="space-y-3">
              {error ? (
                <div className="text-center py-8">
                  <p className="text-red-400">{error.message}</p>
                </div>
              ) : (
                <div className="grid gap-3">
                  {parseStringMessages(completion).map((message, index) => (
                    <Button
                      key={index}
                      onClick={() => handleMessageClick(message)}
                      className="group relative overflow-hidden bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 text-white font-normal px-4 py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02] text-left justify-start h-auto whitespace-normal"
                      variant="outline"
                    >
                      <div className="flex items-start space-x-3">
                        <MessageSquare className="w-4 h-4 mt-0.5 text-violet-400 flex-shrink-0" />
                        <span className="text-sm leading-relaxed">{message}</span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl"></div>
                    </Button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 text-center space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Want Your Own Message Board?
            </h3>
            <p className="text-gray-300">Create your account and start receiving anonymous messages</p>
          </div>

          <Link href="/sign-up">
            <Button className="group relative overflow-hidden bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
              <div className="flex items-center space-x-2">
                <UserPlus className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                <span>Create Your Account</span>
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
