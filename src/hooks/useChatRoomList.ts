import { useState } from "react";
import { useQuery } from "react-query";
import { getChatRoomList } from "../api";

export interface ChatRoomListInerface {
  roomId: string
  recentMessage: string
  recentMessageID: string
  recentMessageTime: Date
  receiverName: string
  receiverUID: string
  senderName: string
  senderUID: string
}

const useChatRoomList = (UID: string) => {
  const [chatRoomList, setChatRoomList] = useState<ChatRoomListInerface[]>([])

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