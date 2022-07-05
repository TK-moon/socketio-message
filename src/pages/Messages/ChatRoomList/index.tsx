import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getUserList } from "../../../api";
import Modal from "../../../components/Modal";
import * as Style from "./index.style";
import { Socket } from "socket.io-client";
import { Link } from "react-router-dom";

type chatRoomItem = {
  body: string;
  created_at: string;
  id: number;
  is_read: number;
  receiverName: string;
  receiver_id: number;
  recentMessage: string;
  recentMessageTime: string;
  senderName: string;
  sender_id: number;
  type: "message" | "system";
};

interface ChatRoomListProp {
  chatRoomList: chatRoomItem[];
  socket: Socket;
  onCreateRoomClick: (senderUID: string, receiverUID: string) => void;
  userUID: string;
}

const ChatRoomList = ({
  chatRoomList,
  socket,
  onCreateRoomClick,
  userUID,
}: ChatRoomListProp) => {
  const [modalVisible, setModalVisible] = useState(false);

  const { data: userList } = useQuery(["user-list"], () =>
    getUserList(userUID)
  );

  const onUserListItemClick = (myUID: string, userUID: string) => {
    onCreateRoomClick(myUID, userUID);
    setModalVisible(false);
  };

  const getRoomAnchorHash = (item: chatRoomItem, UID: string) => {
    return String(item.sender_id) === String(UID)
      ? String(item.receiver_id)
      : String(item.sender_id);
  };

  return (
    <>
      <Style.Header>
        <button onClick={() => setModalVisible(true)}>CREATE</button>
      </Style.Header>
      <nav>
        <Style.SubHeader></Style.SubHeader>
        <ul>
          {chatRoomList.map((item) => {
            return (
              <li key={`${item.id}`}>
                {getRoomAnchorHash(item, userUID)}
                <Link
                  to={{
                    pathname: "detail",
                    hash: getRoomAnchorHash(item, userUID),
                  }}
                >
                  {item.senderName}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <Modal visible={modalVisible}>
        <ul>
          {userList?.map((user: any) => {
            return (
              <li
                onClick={() => onUserListItemClick(userUID, user.id)}
                key={user.id}
              >
                {user.username}
              </li>
            );
          })}
        </ul>
        <div>
          <button onClick={() => setModalVisible(false)}>CLOSE</button>
        </div>
      </Modal>
    </>
  );
};

export default ChatRoomList;
