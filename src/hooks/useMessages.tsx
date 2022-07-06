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
  const [totalCount, setTotalCount] = useState<number>(0);
  const [prevMessageList, setPrevMessageList] = useState<any>([]);
  const [nextMessageList, setNextMessageList] = useState<any>([]);
  const [allLoaded, setAllLoaded] = useState<boolean>(false);

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
        const dbTotalCount = data.totalCount;
        const newList = [...data.list, ...prevMessageList];
        const localTotalCount = newList.length + nextMessageList.length;
        setPrevMessageList(newList);
        setTotalCount(dbTotalCount);
        if (localTotalCount >= dbTotalCount) {
          setAllLoaded(true);
        }
      },
      enabled: !allLoaded,
    }
  );

  const onMessage = useCallback(
    (data: any) => setNextMessageList([...nextMessageList, data]),
    [nextMessageList]
  );

  useEffect(() => {
    socket.on("message", onMessage);
  }, [onMessage, socket]);

  return { prevMessageList, nextMessageList, totalCount, allLoaded };
};

export default useMessages;
