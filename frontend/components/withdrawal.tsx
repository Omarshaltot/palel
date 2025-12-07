"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface User {
  username: string
  password: string
  balance: number
}

interface WithdrawalProps {
  user: User | null
  onBack: () => void
  updateBalance: (newBalance: number) => void
}

export default function Withdrawal({ user, onBack, updateBalance }: WithdrawalProps) {
  const [amount, setAmount] = useState("")
  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const handleWithdraw = () => {
    const withdrawAmount = Number.parseFloat(amount)

    if (!amount || withdrawAmount <= 0) {
      setMessage("Please enter a valid amount")
      setIsSuccess(false)
      return
    }

    if (user && withdrawAmount > user.balance) {
      setMessage("Insufficient funds")
      setIsSuccess(false)
      return
    }

    if (user) {
      updateBalance(user.balance - withdrawAmount)
      setMessage(`Successfully withdrawn $${withdrawAmount.toFixed(2)}`)
      setIsSuccess(true)
      setAmount("")

      setTimeout(() => {
        setMessage("")
        onBack()
      }, 2000)
    }
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Withdrawal</h2>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Amount to Withdraw</label>
          <div className="flex">
            <span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-l-lg">$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600">
            <span className="font-semibold">Current Balance:</span> ${user?.balance.toFixed(2)}
          </p>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-lg mb-6 ${isSuccess ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {message}
        </div>
      )}

      <div className="flex gap-3">
        <Button
          onClick={handleWithdraw}
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg"
        >
          Confirm Withdrawal
        </Button>
        <Button onClick={onBack} className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg">
          Cancel
        </Button>
      </div>
    </Card>
  )
}
