import { useState, useEffect } from 'react'

interface User {
  id: string
  email: string
  subscription?: {
    isValid: boolean
    expiresAt: string
  }
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Fetch user data from your backend
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user')
        const data = await response.json()
        setUser(data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()
  }, [])

  return { user }
}
