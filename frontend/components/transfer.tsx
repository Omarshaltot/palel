"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface User {
  username: string
  password: string
  balance: number
}

interface TransferProps {
  user: User | null
  users: User[]
  onBack: () => void
  transferToUser: (recipientUsername: string, amount: number) => boolean
}

export default function Transfer({ user, users, onBack, transferToUser }: TransferProps) {
  const [recipientUsername, setRecipientUsername] = useState("")
  const [amount, setAmount] = useState("")
  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const otherUsers = users.filter((u) => u.username !== user?.username)

  const handleTransfer = () => {
    if (!recipientUsername) {
      setMessage("Please select a recipient")
      setIsSuccess(false)
      return
    }

    const transferAmount = Number.parseFloat(amount)

    if (!amount || transferAmount <= 0) {
      setMessage("Please enter a valid amount")
      setIsSuccess(false)
      return
    }

    if (user && transferAmount > user.balance) {
      setMessage("Insufficient funds")
      setIsSuccess(false)
      return
    }

    if (transferToUser(recipientUsername, transferAmount)) {
      setMessage(`Successfully transferred $${transferAmount.toFixed(2)} to ${recipientUsername}`)
      setIsSuccess(true)
      setRecipientUsername("")
      setAmount("")

      setTimeout(() => {
        setMessage("")
        onBack()
      }, 2000)
    } else {
      setMessage("Transfer failed")
      setIsSuccess(false)
    }
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Transfer Money</h2>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Username</label>
          <select
            value={recipientUsername}
            onChange={(e) => setRecipientUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="">Select a recipient</option>
            {otherUsers.map((u) => (
              <option key={u.username} value={u.username}>
                {u.username}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Amount to Transfer</label>
          <div className="flex">
            <span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-l-lg">$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600 mb-1">
            <span className="font-semibold">Your Balance:</span> ${user?.balance.toFixed(2)}
          </p>
          {recipientUsername && (
            <p className="text-gray-600">
              <span className="font-semibold">Transfer To:</span> {recipientUsername}
            </p>
          )}
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-lg mb-6 ${isSuccess ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {message}
        </div>
      )}

      <div className="flex gap-3">
        <Button onClick={handleTransfer} className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg">
          Confirm Transfer
        </Button>
        <Button onClick={onBack} className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg">
          Cancel
        </Button>
      </div>
    </Card>
  )
}
