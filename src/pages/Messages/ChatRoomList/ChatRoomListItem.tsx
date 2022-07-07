import { Link } from "react-router-dom";
import { ChatRoomListInerface } from "../../../hooks/useChatRoomList";

interface ChatRoomListItemProps {
  item: ChatRoomListInerface;
  userUID: string;
}

const ChatRoomListItem = ({ item, userUID }: ChatRoomListItemProps) => {
  const getRoomAnchorHash = (item: ChatRoomListInerface, UID: string) => {
    return String(item.senderUID) === String(UID)
      ? String(item.receiverUID)
      : String(item.senderUID);
  };

  return (
    <li key={`${item.roomId}`}>
      <Link
        to={{
          pathname: "detail",
          hash: getRoomAnchorHash(item, userUID),
        }}
      >
        <p>{item.senderName}</p>
        <p>{item.recentMessage}</p>
      </Link>
    </li>
  );
};

export default ChatRoomListItem;
