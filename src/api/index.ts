import axios from 'axios'
const api = axios.create({
  baseURL: "http://localhost:3001"
})

export const getChatRoomList = async (userid: string) => {
  try {
    const response = await fetch('http://localhost:3001/chat/list')
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

export const login = async (id: string, password: string) => {
  const response = await api.post('/auth/login', { id: id, password: password })
  return response.data
}