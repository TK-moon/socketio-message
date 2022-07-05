import axios from 'axios'
const api = axios.create({
  baseURL: "http://localhost:3001"
})

export const login = async (id: string, password: string) => {
  const response = await api.post('/auth/login', { id: id, password: password })
  return response.data
}

export const getUserList = async (myUID: string) => {
  const response = await api.get('/user/list', { params: { myUID: myUID } })
  return response.data
}

export const createChatRoom = async (roomName: string) => {
  const response = await api.post('/chat/room/create', { roomName: roomName })
  return response.data
}