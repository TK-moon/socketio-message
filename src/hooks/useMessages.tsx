import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Socket } from "socket.io-client";
import { getPastMessages } from "../api";

interface useMessageProps {
  senderUID: string;
  receiverUID: string;
  baseID: string | null;
  socket: Socket;
}

const useMessages = ({
  senderUID,
  receiverUID,
  baseID,
  socket,
}: useMessageProps) => {
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [prevMessageList, setPrevMessageList] = useState<any>([]);
  const [nextMessageList, setNextMessageList] = useState<any>([]);

  useQuery(
    ["past-messages", baseID],
    () =>
      getPastMessages({
        senderUID: senderUID,
        receiverUID: receiverUID,
        baseID: baseID,
      }),
    {
      onSuccess: (data) => {
        console.log("success", data);
        setPrevMessageList([...data.list, ...prevMessageList]);
        setTotalCount(data.totalCount);
      },
      enabled:
        (totalCount || 0) >= prevMessageList.length + nextMessageList.length,
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
