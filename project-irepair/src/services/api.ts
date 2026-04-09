import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers:{
        'Content-Type': 'application/json',
    },
})

api.interceptors.response.use(
  response => response,
  error => {
    const requestUrl = String(error.config?.url ?? '')
    const isAuthRequest = requestUrl.startsWith('/auth/')

    if (
      error.response?.status === 401 &&
      !isAuthRequest &&
      window.location.pathname !== '/login'
    ) {
      window.location.replace('/login')
    }
    return Promise.reject(error)
  }
)
