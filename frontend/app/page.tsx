"use client"

import { useState } from "react"
import LoginPage from "@/components/login-page"
import Dashboard from "@/components/dashboard"

interface User {
  username: string
  password: string
  balance: number
}

const mockUsers: User[] = [
  { username: "john", password: "password123", balance: 5000 },
  { username: "jane", password: "password456", balance: 7500 },
  { username: "bob", password: "password789", balance: 3200 },
  { username: "alice", password: "passwordabc", balance: 9800 },
]

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [users, setUsers] = useState(mockUsers)

  const handleLogin = (username: string, password: string) => {
    const user = users.find((u) => u.username === username && u.password === password)
    if (user) {
      setCurrentUser(user)
      setIsLoggedIn(true)
    } else {
      alert("Invalid credentials")
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
  }

  const updateUserBalance = (newBalance: number) => {
    if (currentUser) {
      const updatedUsers = users.map((u) => (u.username === currentUser.username ? { ...u, balance: newBalance } : u))
      setUsers(updatedUsers)
      setCurrentUser({ ...currentUser, balance: newBalance })
    }
  }

  const transferToUser = (recipientUsername: string, amount: number) => {
    if (currentUser && currentUser.balance >= amount) {
      const updatedUsers = users.map((u) => {
        if (u.username === currentUser.username) {
          return { ...u, balance: u.balance - amount }
        }
        if (u.username === recipientUsername) {
          return { ...u, balance: u.balance + amount }
        }
        return u
      })
      setUsers(updatedUsers)
      setCurrentUser({ ...currentUser, balance: currentUser.balance - amount })
      return true
    }
    return false
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {!isLoggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <Dashboard
          user={currentUser}
          users={users}
          onLogout={handleLogout}
          updateBalance={updateUserBalance}
          transferToUser={transferToUser}
        />
      )}
    </div>
  )
}
