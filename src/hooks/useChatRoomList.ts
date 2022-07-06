import { useState } from "react";
import { useQuery } from "react-query";
import { getChatRoomList } from "../api";

const useChatRoomList = (UID: string) => {
  const [chatRoomList, setChatRoomList] = useState([])

  const { isLoading } = useQuery(
    ["chat-room-list", UID],
    () => getChatRoomList(UID),
    {
      onSuccess: (data) => {
        console.log(data)
        setChatRoomList(data)
      }
    }
  );

  return { data: chatRoomList, isLoading }
}

export default useChatRoomList