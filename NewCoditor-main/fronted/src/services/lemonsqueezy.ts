import { createClient } from '@lemonsqueezy/lemonsqueezy.js'

const ls = createClient({
  version: 'v1',
  publicKey: process.env.NEXT_PUBLIC_LEMONSQUEEZY_PUBLIC_KEY || '',
})

export const lemonsqueezy = {
  async createCheckoutSession(planId: string) {
    try {
      const response = await ls.post('/checkout-sessions', {
        data: {
          type: 'checkout-sessions',
          attributes: {
            planId,
            quantity: 1,
          },
        },
      })

      return response.data.attributes.checkoutUrl
    } catch (error) {
      console.error('Error creating checkout session:', error)
      throw error
    }
  },

  async validateSubscription(userId: string) {
    try {
      // Implement subscription validation logic here
      // This would typically involve checking the user's subscription status
      // against your database or LemonSqueezy's API
      return {
        isValid: false,
        expiresAt: null,
      }
    } catch (error) {
      console.error('Error validating subscription:', error)
      throw error
    }
  },
}
