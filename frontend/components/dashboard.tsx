"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import CheckBalance from "./check-balance"
import Withdrawal from "./withdrawal"
import Deposit from "./deposit"
import Transfer from "./transfer"

interface User {
  username: string
  password: string
  balance: number
}

interface DashboardProps {
  user: User | null
  users: User[]
  onLogout: () => void
  updateBalance: (newBalance: number) => void
  transferToUser: (recipientUsername: string, amount: number) => boolean
}

type MenuOption = "menu" | "check" | "withdraw" | "deposit" | "transfer"

export default function Dashboard({ user, users, onLogout, updateBalance, transferToUser }: DashboardProps) {
  const [currentPage, setCurrentPage] = useState<MenuOption>("menu")

  const handleBack = () => setCurrentPage("menu")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">BankApp</h1>
            <p className="text-gray-600 mt-1">Welcome, {user?.username}!</p>
          </div>
          <Button onClick={onLogout} className="bg-red-600 hover:bg-red-700 text-white">
            Logout
          </Button>
        </div>

        {/* Balance Card */}
        <Card className="p-6 mb-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
          <p className="text-sm opacity-90 mb-2">Current Balance</p>
          <h2 className="text-4xl font-bold">${user?.balance.toFixed(2)}</h2>
        </Card>

        {/* Menu */}
        {currentPage === "menu" && (
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => setCurrentPage("check")}
              className="p-6 h-auto flex flex-col items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-lg"
            >
              <span className="text-2xl mb-2">💰</span>
              <span className="font-semibold">Check Balance</span>
            </Button>
            <Button
              onClick={() => setCurrentPage("withdraw")}
              className="p-6 h-auto flex flex-col items-center justify-center bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
            >
              <span className="text-2xl mb-2">💸</span>
              <span className="font-semibold">Withdraw</span>
            </Button>
            <Button
              onClick={() => setCurrentPage("deposit")}
              className="p-6 h-auto flex flex-col items-center justify-center bg-purple-500 hover:bg-purple-600 text-white rounded-lg"
            >
              <span className="text-2xl mb-2">📥</span>
              <span className="font-semibold">Deposit</span>
            </Button>
            <Button
              onClick={() => setCurrentPage("transfer")}
              className="p-6 h-auto flex flex-col items-center justify-center bg-pink-500 hover:bg-pink-600 text-white rounded-lg"
            >
              <span className="text-2xl mb-2">🔄</span>
              <span className="font-semibold">Transfer</span>
            </Button>
          </div>
        )}

        {/* Pages */}
        {currentPage === "check" && <CheckBalance user={user} onBack={handleBack} />}
        {currentPage === "withdraw" && <Withdrawal user={user} onBack={handleBack} updateBalance={updateBalance} />}
        {currentPage === "deposit" && <Deposit user={user} onBack={handleBack} updateBalance={updateBalance} />}
        {currentPage === "transfer" && (
          <Transfer user={user} users={users} onBack={handleBack} transferToUser={transferToUser} />
        )}
      </div>
    </div>
  )
}
