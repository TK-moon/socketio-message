import {
  FormEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import { Socket } from "socket.io-client";
import { debounce } from "lodash";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import useMessages from "../../../hooks/useMessages";
import { extractNumber, scrollToBottom } from "../../../lib/utils";
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
  const containerRef = useRef<HTMLTableSectionElement>(null);
  const prevChatLoaderObserverRef = useRef<HTMLDivElement>(null);
  const [prevScrollHeight, setPrevScrollHeight] = useState<
    number | undefined | null
  >(null);

  const location = useLocation();
  const receiverUID = extractNumber(location.hash);
  const [message, setMessage] = useState("");
  const [baseID, setBaseID] = useState<string | null>(null);

  const { prevMessageList, nextMessageList } = useMessages({
    senderUID: userInfo.id,
    receiverUID,
    baseID,
    socket,
  });

  const prevChatLoaderEntry = useIntersectionObserver(
    prevChatLoaderObserverRef,
    {
      threshold: 1,
    }
  );

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
    scrollToBottom({ containerRef, when: "always", isBehaviorSmooth: true });
    socket.emit("enter-room", { senderUID: userInfo.id, receiverUID });
    return () => {
      socket.emit("leave-room", { senderUID: userInfo.id, receiverUID });
    };
  }, []);

  const debounceSetNextPage = useCallback(
    debounce(() => {
      setPrevScrollHeight(containerRef.current?.scrollHeight);
      setBaseID("0");
    }, 300),
    [prevMessageList]
  );

  useLayoutEffect(() => {
    if (!prevMessageList.length) return;
    if (prevChatLoaderEntry?.isIntersecting) {
      console.log("trigger", prevChatLoaderEntry?.isIntersecting);
      debounceSetNextPage();
    }
  }, [prevChatLoaderEntry?.isIntersecting]);

  useEffect(() => {
    if (!containerRef.current || !prevMessageList.length) {
      return;
    }

    if (prevScrollHeight) {
      const lastData = prevMessageList[prevMessageList.length - 1].id;
      setBaseID(lastData);
    } else {
      scrollToBottom({ containerRef, when: "always" });
    }
  }, [prevMessageList]);

  useEffect(() => {
    scrollToBottom({ containerRef, when: "always", isBehaviorSmooth: true });
  }, [nextMessageList]);

  return (
    <>
      <Style.Header>
        <button onClick={() => onLeaveRoomClick(userInfo.id, receiverUID)}>
          BACK
        </button>
      </Style.Header>
      <Style.Section ref={containerRef}>
        <div ref={prevChatLoaderObserverRef}>LOADING..</div>
        <ul>
          {prevMessageList?.map((message: any, index: number) => {
            return <li key={`${index}-${message.body}`}>{message.body}</li>;
          })}
          {nextMessageList.map((message: any, index: number) => {
            return <li key={`${index}-${message.body}`}>{message.body}</li>;
          })}
        </ul>
      </Style.Section>
      <Style.Footer>
        <form onSubmit={onSubmit}>
          <input value={message} onChange={(e) => setMessage(e.target.value)} />
          <button>SEND</button>
        </form>
      </Style.Footer>
    </>
  );
};

export default ChatDetail;
