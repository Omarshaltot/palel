"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface LoginPageProps {
  onLogin: (username: string, password: string) => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!username || !password) {
      setError("Please fill in all fields")
      return
    }
    onLogin(username, password)
    setError("")
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">BankApp</h1>
          <p className="text-gray-600">Welcome back</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
            />
          </div>

          {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
          >
            Login
          </Button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-xs text-gray-600 font-semibold mb-2">Demo Credentials:</p>
          <div className="text-xs space-y-1 text-gray-700">
            <p>john / password123</p>
            <p>jane / password456</p>
            <p>bob / password789</p>
            <p>alice / passwordabc</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
