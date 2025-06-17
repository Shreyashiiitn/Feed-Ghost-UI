"use client"

import { useState } from "react"
import axios, { type AxiosError } from "axios"
import dayjs from "dayjs"
import { Trash2, Clock, Loader2, AlertTriangle } from "lucide-react"
import type { Message } from "@/Model/User"
import { Card, CardHeader } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button"
import { toast } from "sonner"
import type { ApiResponse } from "@/types/ApiResponse"

type MessageCardProps = {
  message: Message
  onMessageDelete: (messageId: string) => void
}

export function MessageCard({ message, onMessageDelete }: MessageCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteConfirm = async () => {
    if (!message._id) return

    setIsDeleting(true)
    try {
      const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)
      toast.success(response.data.message)
      onMessageDelete(message._id)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(axiosError.response?.data.message ?? "Failed to delete message")
    } finally {
      setIsDeleting(false)
    }
  }

  const formattedDate = message.createdAt ? dayjs(message.createdAt).format("MMM D, YYYY h:mm A") : "Unknown date"

  return (
    <Card className="group backdrop-blur-md bg-white/5 border border-white/20 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/10 hover:shadow-xl hover:shadow-violet-500/10 hover:border-white/30">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start space-x-4">
          <div className="flex-1 space-y-3">
            {/* Message Content */}
            <div className="text-white text-lg leading-relaxed break-words">{message.content}</div>

            {/* Timestamp */}
            <div className="flex items-center text-gray-300 text-sm">
              <Clock className="h-4 w-4 mr-2 text-violet-400" />
              <span>{formattedDate}</span>
            </div>
          </div>

          {/* Delete Button */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="group/delete bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 text-gray-300 hover:text-red-300 transition-all duration-200 transform hover:scale-105 active:scale-95 opacity-70 group-hover:opacity-100"
              >
                <Trash2 className="h-4 w-4 group-hover/delete:scale-110 transition-transform duration-200" />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="backdrop-blur-xl bg-gray-900/90 border border-white/20 rounded-2xl shadow-2xl">
              <AlertDialogHeader className="space-y-4">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl mx-auto">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                <AlertDialogTitle className="text-2xl font-bold text-white text-center">
                  Delete Message?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-gray-300 text-center text-base leading-relaxed">
                  This action cannot be undone. This will permanently delete this anonymous message from your dashboard.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter className="flex flex-col sm:flex-row gap-3 pt-6">
                <AlertDialogCancel className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white font-medium px-6 py-2 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 sm:flex-1">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteConfirm}
                  disabled={isDeleting}
                  className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold px-6 py-2 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none sm:flex-1"
                >
                  {isDeleting ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Deleting...</span>
                    </div>
                  ) : (
                    "Delete Message"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>

      {/* Decorative gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </Card>
  )
}
