import axios from "axios"
import { useAuthStore } from "./store/auth-store"

const api = axios.create({
  baseURL: "http://localhost:3000",
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
