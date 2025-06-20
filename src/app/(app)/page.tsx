"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail, ArrowRight, Sparkles, MessageSquare, Shield, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"
import messages from "@/messages.json"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <main className="relative flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 text-white">
        {/* Hero Section */}
        <section className="text-center mb-12 md:mb-16 space-y-8">
          {/* Logo/Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-violet-500 to-purple-500 rounded-3xl mb-8 shadow-2xl">
            <MessageSquare className="w-10 h-10 text-white" />
          </div>

          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-violet-200 to-purple-200 bg-clip-text text-transparent leading-tight">
              Dive into the World of
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                Anonymous Feedback
              </span>
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent font-semibold">
                Feed-Ghost
              </span>{" "}
              - Where your identity remains a secret and honest conversations flourish.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link href="/sign-up">
              <Button className="group relative overflow-hidden bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-lg">
                <div className="flex items-center space-x-2">
                  <span>Get Started</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl"></div>
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button
                variant="outline"
                className="group relative overflow-hidden bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white font-medium px-8 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 text-lg"
              >
                <div className="flex items-center space-x-2">
                  <span>Sign In</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl"></div>
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full max-w-6xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
              Why Choose Feed-Ghost?
            </h2>
            <p className="text-gray-300 text-lg">Experience the power of anonymous communication</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl p-6 text-center space-y-4 hover:bg-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">100% Anonymous</h3>
              <p className="text-gray-300">
                Your identity is completely protected. Share and receive feedback without revealing who you are.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl p-6 text-center space-y-4 hover:bg-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Easy to Use</h3>
              <p className="text-gray-300">
                Simple and intuitive interface. Send messages, receive feedback, and manage everything effortlessly.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl p-6 text-center space-y-4 hover:bg-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Build Community</h3>
              <p className="text-gray-300">
                Foster honest conversations and build stronger relationships through anonymous feedback.
              </p>
            </div>
          </div>
        </section>

        {/* Carousel Section */}
        <section className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 mb-4">
              <Sparkles className="w-6 h-6 text-violet-400" />
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Real Messages
              </h2>
              <Sparkles className="w-6 h-6 text-violet-400" />
            </div>
            <p className="text-gray-300 text-lg">See what people are sharing anonymously</p>
          </div>

          <Carousel plugins={[Autoplay({ delay: 3000 })]} className="w-full max-w-2xl mx-auto">
            <CarouselContent>
              {messages.map((message, index) => (
                <CarouselItem key={index} className="p-4">
                  <Card className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl shadow-2xl hover:bg-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-white text-xl font-semibold flex items-center space-x-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl">
                          <Mail className="w-5 h-5 text-white" />
                        </div>
                        <span>{message.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-200 text-lg leading-relaxed">{message.content}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <p className="text-sm text-gray-400">{message.received}</p>
                        <div className="flex items-center space-x-1 text-violet-400">
                          <MessageSquare className="w-4 h-4" />
                          <span className="text-sm">Anonymous</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-white/10 hover:bg-white/20 border-white/20 text-white hover:text-white" />
            <CarouselNext className="bg-white/10 hover:bg-white/20 border-white/20 text-white hover:text-white" />
          </Carousel>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative backdrop-blur-xl bg-white/5 border-t border-white/10 text-center p-6 md:p-8 text-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Feed-Ghost
              </span>
            </div>
            <p className="text-gray-300">© 2025 Feed-Ghost. All rights reserved.</p>
            <div className="flex items-center space-x-4">
              <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                Terms
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative gradient line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"></div>
      </footer>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-4 h-4 bg-violet-500/20 rounded-full blur-sm"></div>
      <div className="absolute top-20 right-20 w-6 h-6 bg-purple-500/20 rounded-full blur-sm"></div>
      <div className="absolute bottom-20 left-20 w-8 h-8 bg-indigo-500/20 rounded-full blur-sm"></div>
    </div>
  )
}
