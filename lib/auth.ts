import { createClient } from './supabase/client'
import { createClient as createServerClient } from './supabase/server'
import { User, Session } from '@supabase/supabase-js'

export interface AuthUser {
  id: string
  email: string
  fullName?: string
  role?: string
  avatarUrl?: string
  phone?: string
}

// Client-side auth functions
export const auth = {
  // Sign up with email and password
  async signUp(email: string, password: string, fullName?: string) {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })
    return { data, error }
  },

  // Sign in with email and password
  async signIn(email: string, password: string) {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  // Sign out
  async signOut() {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current user
  async getCurrentUser() {
    const supabase = createClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Get current session
  async getCurrentSession() {
    const supabase = createClient()
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  },

  // Reset password
  async resetPassword(email: string) {
    const supabase = createClient()
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    return { data, error }
  },

  // Update password
  async updatePassword(password: string) {
    const supabase = createClient()
    const { data, error } = await supabase.auth.updateUser({
      password,
    })
    return { data, error }
  },

  // Update user profile
  async updateProfile(updates: Partial<AuthUser>) {
    const supabase = createClient()
    const { data, error } = await supabase.auth.updateUser({
      data: updates,
    })
    return { data, error }
  },

  // Listen to auth state changes
  onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    const supabase = createClient()
    return supabase.auth.onAuthStateChange(callback)
  },
}

// Server-side auth functions
export const serverAuth = {
  // Get user from server-side
  async getUser() {
    const supabase = createServerClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Get session from server-side
  async getSession() {
    const supabase = createServerClient()
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  },

  // Check if user is authenticated
  async isAuthenticated() {
    const { user } = await this.getUser()
    return !!user
  },

  // Check if user has specific role
  async hasRole(role: string) {
    const { user } = await this.getUser()
    if (!user) return false
    
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
    
    return profile?.role === role
  },
}

// Helper function to convert Supabase user to our AuthUser type
export function convertToAuthUser(user: User | null): AuthUser | null {
  if (!user) return null

  return {
    id: user.id,
    email: user.email || '',
    fullName: user.user_metadata?.full_name || user.user_metadata?.name,
    role: user.user_metadata?.role || 'student',
    avatarUrl: user.user_metadata?.avatar_url,
    phone: user.user_metadata?.phone,
  }
}
