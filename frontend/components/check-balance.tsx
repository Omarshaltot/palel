"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface User {
  username: string
  password: string
  balance: number
}

interface CheckBalanceProps {
  user: User | null
  onBack: () => void
}

export default function CheckBalance({ user, onBack }: CheckBalanceProps) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Check Balance</h2>

      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 rounded-lg mb-6">
        <p className="text-sm opacity-90 mb-2">Your Current Balance</p>
        <h3 className="text-4xl font-bold">${user?.balance.toFixed(2)}</h3>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <p className="text-gray-600">
          <span className="font-semibold">Account Holder:</span> {user?.username}
        </p>
      </div>

      <Button onClick={onBack} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
        Back to Menu
      </Button>
    </Card>
  )
}
