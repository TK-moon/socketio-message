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
import {
  extractNumber,
  scrollToBottom,
  scrollToPosition,
} from "../../../lib/utils";
import * as Style from "./index.style";
import ChatMessageListItem from "./ChatMessageListItem";

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

  const { prevMessageList, nextMessageList, totalCount } = useMessages({
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
    socket.emit("enter-room", { senderUID: userInfo.id, receiverUID });
    return () => {
      socket.emit("leave-room", { senderUID: userInfo.id, receiverUID });
    };
  }, []);

  const debounceSetNextPage = useCallback(
    debounce(() => {
      setPrevScrollHeight(containerRef.current?.scrollHeight);
      const lastData = prevMessageList[0].id;
      console.log("setBaseID", lastData);
      setBaseID(lastData);
    }, 300),
    [prevMessageList]
  );

  useLayoutEffect(() => {
    if (!prevMessageList.length) return;
    if (prevChatLoaderEntry?.isIntersecting) {
      debounceSetNextPage();
    }
  }, [prevChatLoaderEntry?.isIntersecting]);

  useEffect(() => {
    if (!containerRef.current || !prevMessageList.length) {
      return;
    }

    if (prevScrollHeight) {
      // const nextScrollHeight =
      //   containerRef.current.scrollHeight - prevScrollHeight;
      // scrollToPosition(containerRef, nextScrollHeight);
    } else {
      scrollToBottom({ containerRef, when: "always" });
    }
  }, [prevMessageList]);

  useEffect(() => {
    console.log("length", prevMessageList.length);
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
        {baseID}
        <p>total : {totalCount}</p>
      </Style.Header>
      <Style.Section ref={containerRef}>
        <div ref={prevChatLoaderObserverRef}>LOADING..</div>
        <Style.ChatMessageContainer>
          <ChatMessageListItem list={prevMessageList} myUID={userInfo.id} />
          <ChatMessageListItem list={nextMessageList} myUID={userInfo.id} />
          {/* {prevMessageList.map((message: any, index: number) => {
            return (
              <Style.ChatMessageListItem
                key={`${index}-${message.body}`}
                isMyMessage={userInfo.id === message.sender_id}
              >
                <div>{message.body}</div>
              </Style.ChatMessageListItem>
            );
          })}
          {nextMessageList.map((message: any, index: number) => {
            return (
              <Style.ChatMessageListItem
                key={`${index}-${message.body}`}
                isMyMessage={userInfo.id === message.sender_id}
              >
                <div>{message.body}</div>
              </Style.ChatMessageListItem>
            );
          })} */}
        </Style.ChatMessageContainer>
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
