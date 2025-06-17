"use client"

import { MessageCard } from "@/components/MessageCard"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import type { Message } from "@/Model/User"
import type { ApiResponse } from "@/types/ApiResponse"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { type AxiosError } from "axios"
import { Loader2, RefreshCcw, Copy, Check, LinkIcon, MessageSquare, Bell, BellOff } from "lucide-react"
import type { User } from "next-auth"
import { useSession } from "next-auth/react"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { AcceptMessageSchema } from "@/Schemas/acceptMessageSchema"
import { toast } from "sonner"

function UserDashboard() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSwitchLoading, setIsSwitchLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId))
  }

  const sessionResult = useSession()
  const { data: session } = sessionResult || {}

  const form = useForm({
    resolver: zodResolver(AcceptMessageSchema),
  })

  const { register, watch, setValue } = form
  const acceptMessages = watch("acceptMessages")

  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true)
    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages")
      setValue("acceptMessages", response.data.isAcceptingMessages ?? false)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(axiosError.response?.data.message ?? "Failed to fetch message settings")
    } finally {
      setIsSwitchLoading(false)
    }
  }, [setValue])

  const fetchMessages = useCallback(
    async (refresh = false) => {
      setIsLoading(true)
      try {
        const response = await axios.get<ApiResponse>("/api/get-messages")
        setMessages(response.data.messages || [])
        if (refresh) {
          toast.success("Messages refreshed successfully")
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>
        toast.error(axiosError.response?.data.message ?? "Failed to fetch messages")
      } finally {
        setIsLoading(false)
      }
    },
    [setIsLoading, setMessages],
  )

  useEffect(() => {
    if (!session || !session.user) return

    fetchMessages()
    fetchAcceptMessages()
  }, [session, fetchAcceptMessages, fetchMessages])

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      })
      setValue("acceptMessages", !acceptMessages)
      toast.success(response.data.message)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(axiosError.response?.data.message ?? "Failed to update message settings")
    }
  }

  if (!session || !session.user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 text-center">
          <Loader2 className="h-8 w-8 text-white animate-spin mx-auto mb-4" />
          <p className="text-white">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const { username } = session?.user as User
  const baseUrl = typeof window !== "undefined" ? `${window.location.protocol}//${window.location.host}` : ""
  const profileUrl = `${baseUrl}/u/${username}`

  const copyToClipboard = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(profileUrl)
      setCopied(true)
      toast.success("Profile URL copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 p-4 md:p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative container mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Your Dashboard
            </h1>
            <p className="text-gray-300">Manage your messages and profile settings</p>
          </div>
        </div>

        {/* Profile URL Section */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 space-y-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl">
              <LinkIcon className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Your Profile Link
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-3">
            <div className="bg-white/5 border border-white/20 rounded-xl p-3 flex-1 overflow-hidden">
              <p className="text-gray-300 text-sm mb-1">Share this link to receive anonymous messages:</p>
              <p className="text-white font-mono text-sm truncate">{profileUrl}</p>
            </div>
            <Button
              onClick={copyToClipboard}
              className="group relative overflow-hidden bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl w-full md:w-auto"
            >
              <div className="flex items-center space-x-2">
                {copied ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Copy className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                )}
                <span>{copied ? "Copied!" : "Copy Link"}</span>
              </div>
            </Button>
          </div>
        </div>

        {/* Message Settings Section */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 space-y-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl">
              {acceptMessages ? <Bell className="w-5 h-5 text-white" /> : <BellOff className="w-5 h-5 text-white" />}
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Message Settings
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <Switch
              {...register("acceptMessages")}
              checked={acceptMessages}
              onCheckedChange={handleSwitchChange}
              disabled={isSwitchLoading}
              className="data-[state=checked]:bg-violet-500"
            />
            <div className="space-y-1">
              <p className="text-white font-medium">
                Accept Messages:{" "}
                <span className={acceptMessages ? "text-green-400" : "text-red-400"}>
                  {acceptMessages ? "On" : "Off"}
                </span>
              </p>
              <p className="text-gray-300 text-sm">
                {acceptMessages
                  ? "You are currently receiving anonymous messages"
                  : "You are not receiving anonymous messages"}
              </p>
            </div>
            {isSwitchLoading && <Loader2 className="h-4 w-4 text-white animate-spin" />}
          </div>
        </div>

        {/* Messages Section */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Your Messages
              </h2>
            </div>

            <Button
              onClick={(e) => {
                e.preventDefault()
                fetchMessages(true)
              }}
              className="group relative overflow-hidden bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white font-medium px-4 py-2 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95"
              variant="outline"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 text-white animate-spin" />
              ) : (
                <div className="flex items-center space-x-2">
                  <RefreshCcw className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
                  <span className="hidden md:inline">Refresh</span>
                </div>
              )}
            </Button>
          </div>

          <Separator className="bg-white/20" />

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 text-white animate-spin" />
            </div>
          ) : messages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {messages.map((message) => (
                <MessageCard key={message._id as string} message={message} onMessageDelete={handleDeleteMessage} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-300 text-lg">No messages to display</p>
              <p className="text-gray-400 text-sm mt-2">Share your profile link to start receiving messages</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
