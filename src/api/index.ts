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

export const getChatRoomList = async (UID: string) => {
  const response = await api.get('/chat/room/list', { params: { UID: UID } })
  return response.data
}