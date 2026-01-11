import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { type User } from '../mock-data'

interface AuthState {
    user: User | null
    accessToken: string | null
    isAuthenticated: boolean
    login: (user: User, accessToken: string) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            isAuthenticated: false,
            login: (user, accessToken) => set({ user, accessToken, isAuthenticated: true }),
            logout: () => set({ user: null, accessToken: null, isAuthenticated: false }),
        }),
        {
            name: 'taskflow_auth_storage', // unique name
            storage: createJSONStorage(() => localStorage),
        }
    )
)
