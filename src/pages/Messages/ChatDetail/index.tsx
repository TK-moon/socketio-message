import { FormEvent, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { Socket } from "socket.io-client";
import { getPastMessages } from "../../../api";
import { extractNumber } from "../../../lib/utils";
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
  const location = useLocation();
  const receiverUID = extractNumber(location.hash);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const { data: prevMessageList } = useQuery(
    ["past-messages"],
    () =>
      getPastMessages({
        senderUID: userInfo.id,
        receiverUID: receiverUID,
        page: page,
      }),
    {}
  );

  const [nextMessageList, setNextMessageList] = useState([]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const arg = {
      senderUsername: userInfo.username,
      senderUID: userInfo.id,
      receiverUID: receiverUID,
      body: message,
    };
    socket.emit("message", arg);
    setMessage("");
  };

  useEffect(() => {
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
        <ul>
          {(prevMessageList ?? []).map((message: any) => {
            return <li key={message.id}>{message.body}</li>;
          })}
        </ul>
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
