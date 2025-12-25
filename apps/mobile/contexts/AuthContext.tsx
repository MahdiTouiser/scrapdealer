import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  authenticated: boolean | null
  signIn: (token: string, refreshToken?: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const load = async () => {
      const token = await AsyncStorage.getItem('auth_token')
      setAuthenticated(!!token)
    }
    load()
  }, [])

  const signIn = async (token: string, refreshToken?: string) => {
    if (token) {
      await AsyncStorage.setItem('auth_token', token)
    }
    if (refreshToken) {
      await AsyncStorage.setItem('refresh_token', refreshToken)
    }
    setAuthenticated(true)
  }

  const signOut = async () => {
    await AsyncStorage.multiRemove(['auth_token', 'refresh_token', 'hasSeenOnboarding'])
    setAuthenticated(false)
  }


  return (
    <AuthContext.Provider value={{ authenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
93
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
