import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // TODO: Implement actual user authentication and subscription check
    // For now, returning a mock response
    const mockUser = {
      id: '1',
      email: 'user@example.com',
      subscription: {
        isValid: false,
        expiresAt: null
      }
    }

    return NextResponse.json(mockUser)
  } catch (error) {
    console.error('Error fetching user data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    )
  }
}
