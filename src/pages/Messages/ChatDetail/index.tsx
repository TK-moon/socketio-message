import { FormEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Socket } from "socket.io-client";
import * as Style from "./index.style";

interface ChatDetailProps {
  onLeaveRoomClick: (senderUID: string, receiverUID: string) => void;
  socket: Socket;
  userInfo: any;
}

const ChatDetail = ({
  onLeaveRoomClick,
  socket,
  userInfo,
}: ChatDetailProps) => {
  const extractNumber = (hash: string) => {
    return hash.replace(/[^0-9]/g, "");
  };

  const location = useLocation();
  const receiverUID = extractNumber(location.hash);

  const [message, setMessage] = useState("");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const arg = {
      senderUsername: userInfo.username,
      senderUID: userInfo.id,
      receiverUID: receiverUID,
      body: message,
    };
    socket.emit("message", arg);
  };

  useEffect(() => {
    console.log(userInfo.id, receiverUID);
    socket.emit("enter-room", { senderUID: userInfo.id, receiverUID });
    return () => {
      socket.emit("leave-room", { senderUID: userInfo.id, receiverUID });
    };
  }, []);

  return (
    <>
      <Style.Header>
        <button onClick={() => onLeaveRoomClick(userInfo.id, receiverUID)}>
          BACK
        </button>
      </Style.Header>
      <Style.Section>
        <Style.Footer>
          <form onSubmit={onSubmit}>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button>SEND</button>
          </form>
        </Style.Footer>
      </Style.Section>
    </>
  );
};

export default ChatDetail;
