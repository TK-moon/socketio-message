import { FormEvent, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import * as Style from "./index.style";

interface ChatDetailProps {
  onLeaveRoomClick: (senderUID: string, receiverUID: string) => void;
  receiverUID: string;
  socket: Socket;
  userInfo: any;
}

const ChatDetail = ({
  onLeaveRoomClick,
  receiverUID,
  socket,
  userInfo,
}: ChatDetailProps) => {
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
