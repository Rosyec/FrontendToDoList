import axios from "axios"
import { useAuthStore } from "./store/auth-store"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})

api.interceptors.request.use((config) => {
  // Access token directly from Zustand store (it's synced with localStorage)
  const { accessToken } = useAuthStore.getState()

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

export default api
