"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Sparkles, Code } from "lucide-react"

export default function PricingPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const featureItem = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 },
  }

  return (
    <div className="min-h-screen bg-[#0a1020] text-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto py-24 px-4"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-[#1a2b45] p-4 rounded-full"
            >
              <Code className="w-10 h-10 text-[#3b82f6]" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] text-transparent bg-clip-text">
                Choose Your Plan
              </span>
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "180px" }}
              transition={{ delay: 1, duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] mx-auto rounded-full"
            />
          </motion.div>

          <p className="text-gray-300 text-lg max-w-2xl mx-auto mt-8 leading-relaxed">
            Start coding with our powerful IDE. Choose the plan that fits your needs and take your development skills to
            the next level.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto"
        >
          {/* Free Plan */}
          <motion.div variants={item}>
            <Card
              className="relative overflow-hidden border-[#1a2b45] bg-[#111827] h-full"
              onMouseEnter={() => setHoveredCard("free")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#1a2b45]/50 to-[#3b82f6]/10 rounded-lg"
                animate={{
                  opacity: hoveredCard === "free" ? 1 : 0,
                  scale: hoveredCard === "free" ? 1.05 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-white">Free</CardTitle>
                <CardDescription className="text-gray-300">Perfect for beginners and casual users</CardDescription>
                <div className="mt-4 text-4xl font-bold text-white">$0</div>
                <p className="text-sm text-gray-300 mt-1">Forever free</p>
              </CardHeader>
              <CardContent>
                <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
                  <motion.div variants={featureItem} className="flex items-center">
                    <div className="rounded-full bg-[#3b82f6]/20 p-1 mr-3">
                      <Check className="w-4 h-4 text-[#3b82f6]" />
                    </div>
                    <span className="text-gray-200">Basic code execution</span>
                  </motion.div>
                  <motion.div variants={featureItem} className="flex items-center">
                    <div className="rounded-full bg-[#3b82f6]/20 p-1 mr-3">
                      <Check className="w-4 h-4 text-[#3b82f6]" />
                    </div>
                    <span className="text-gray-200">Community support</span>
                  </motion.div>
                  <motion.div variants={featureItem} className="flex items-center">
                    <div className="rounded-full bg-[#3b82f6]/20 p-1 mr-3">
                      <Check className="w-4 h-4 text-[#3b82f6]" />
                    </div>
                    <span className="text-gray-200">Limited language support</span>
                  </motion.div>
                </motion.div>
              </CardContent>
              <CardFooter>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full">
                  <Link href="/" className="block w-full">
                    <Button variant="outline" className="w-full border-[#3b82f6] text-[#3b82f6] hover:bg-[#3b82f6]/10">
                      Get Started
                    </Button>
                  </Link>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Pro Plan */}
          <motion.div variants={item}>
            <Card
              className="relative overflow-hidden border-[#1a2b45] bg-[#111827] h-full"
              onMouseEnter={() => setHoveredCard("pro")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/20 to-[#60a5fa]/20 rounded-lg"
                animate={{
                  opacity: hoveredCard === "pro" ? 1 : 0.3,
                  scale: hoveredCard === "pro" ? 1.05 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute -right-6 -top-6">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-24 h-24 bg-gradient-to-br from-[#3b82f6]/30 to-[#60a5fa]/30 rounded-full blur-xl"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute top-0 right-0 bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                POPULAR
              </motion.div>
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-white">Pro</CardTitle>
                <CardDescription className="text-gray-300">For serious developers and teams</CardDescription>
                <div className="mt-4 text-4xl font-bold text-white">
                  $29<span className="text-lg text-gray-300 ml-1">/month</span>
                </div>
                <p className="text-sm text-gray-300 mt-1">Billed annually or $39 monthly</p>
              </CardHeader>
              <CardContent>
                <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
                  <motion.div variants={featureItem} className="flex items-center">
                    <div className="rounded-full bg-[#3b82f6]/20 p-1 mr-3">
                      <Check className="w-4 h-4 text-[#3b82f6]" />
                    </div>
                    <span className="text-gray-200">Full language support</span>
                  </motion.div>
                  <motion.div variants={featureItem} className="flex items-center">
                    <div className="rounded-full bg-[#3b82f6]/20 p-1 mr-3">
                      <Check className="w-4 h-4 text-[#3b82f6]" />
                    </div>
                    <span className="text-gray-200">Priority support</span>
                  </motion.div>
                  <motion.div variants={featureItem} className="flex items-center">
                    <div className="rounded-full bg-[#3b82f6]/20 p-1 mr-3">
                      <Check className="w-4 h-4 text-[#3b82f6]" />
                    </div>
                    <span className="text-gray-200">Advanced features</span>
                  </motion.div>
                  <motion.div variants={featureItem} className="flex items-center">
                    <div className="rounded-full bg-[#3b82f6]/20 p-1 mr-3">
                      <Check className="w-4 h-4 text-[#3b82f6]" />
                    </div>
                    <span className="text-gray-200">Custom themes</span>
                  </motion.div>
                  <motion.div variants={featureItem} className="flex items-center">
                    <div className="rounded-full bg-[#3b82f6]/20 p-1 mr-3">
                      <Check className="w-4 h-4 text-[#3b82f6]" />
                    </div>
                    <span className="text-gray-200">API access</span>
                  </motion.div>
                </motion.div>
              </CardContent>
              <CardFooter>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full">
                  <Button className="w-full bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] hover:from-[#3b82f6] hover:to-[#3b82f6] text-white border-0">
                    Get Pro Plan
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400">
            Need a custom solution for your team?{" "}
            <span className="text-[#3b82f6] hover:underline cursor-pointer">Contact us</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
