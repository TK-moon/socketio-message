import { memo } from "react";
import * as Style from "./ChatMessageListItem.style";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { MessageInterface } from "../../../hooks/useMessages";
dayjs.extend(utc);

interface ChatMessageListItemProps {
  list: MessageInterface[];
  myUID: string;
}

const ChatMessageListItem = (props: ChatMessageListItemProps) => {
  return (
    <>
      {props.list.map((message: MessageInterface) => {
        return (
          <Style.ChatMessageListItem
            key={message.id}
            isMyMessage={props.myUID === message.senderUID}
          >
            <div>{message.body}</div>
            <div>{dayjs(message.created_at).format("YYYY-MM-DD HH:mm:ss")}</div>
          </Style.ChatMessageListItem>
        );
      })}
    </>
  );
};

export default memo(ChatMessageListItem);
