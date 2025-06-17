"use client"

import dayjs from "dayjs"
import { Clock } from "lucide-react"
import type { Message } from "@/Model/User"
import { Card, CardHeader } from "@/components/ui/card"

type MessageCardProps = {
  message: Message
}

export function MessageCard({ message }: MessageCardProps) {
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
        </div>
      </CardHeader>

      {/* Decorative gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </Card>
  )
}
