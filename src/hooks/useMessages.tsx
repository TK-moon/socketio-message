import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Socket } from "socket.io-client";
import { getPastMessages } from "../api";

interface useMessageProps {
  senderUID: string;
  receiverUID: string;
  page: number;
  socket: Socket;
}

const useMessages = ({
  senderUID,
  receiverUID,
  page,
  socket,
}: useMessageProps) => {
  const [prevMessageList, setPrevMessageList] = useState<any>([]);
  const [nextMessageList, setNextMessageList] = useState<any>([]);

  useQuery(
    ["past-messages", page],
    () =>
      getPastMessages({
        senderUID: senderUID,
        receiverUID: receiverUID,
        page: page,
      }),
    {
      onSuccess: (data) => {
        console.log(data);
        setPrevMessageList([...prevMessageList, ...data]);
      },
    }
  );

  const onMessage = useCallback(
    (data: any) => setNextMessageList([...nextMessageList, data]),
    [nextMessageList]
  );

  useEffect(() => {
    socket.on("message", onMessage);
  }, [onMessage, socket]);

  return { prevMessageList, nextMessageList };
};

export default useMessages;
