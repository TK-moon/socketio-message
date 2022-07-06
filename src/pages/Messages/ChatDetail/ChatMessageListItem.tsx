import { memo, useEffect } from "react";
import * as Style from "./ChatMessageListItem.style";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

interface ChatMessageListItemProps {
  list: any;
  myUID: string;
}

const ChatMessageListItem = (props: ChatMessageListItemProps) => {
  // useEffect(() => {
  //   console.log(props.list);
  // }, [props.list]);
  return (
    <>
      {props.list.map((message: any, index: number) => {
        return (
          <Style.ChatMessageListItem
            key={`${index}-${message.body}`}
            isMyMessage={props.myUID === message.sender_id}
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