export const getChatRoomList = async (userid: string) => {
  try {
    const response = await fetch('http://localhost:3001/chat/list')
    const data = await response.json()
    console.log(response)
    return data
  } catch (error) {
    console.error(error)
  }
}