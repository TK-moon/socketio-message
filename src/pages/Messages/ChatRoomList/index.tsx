import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getUserList } from "../../../api";
import Modal from "../../../components/Modal";
import * as Style from "./index.style";
import { Socket } from "socket.io-client";

interface ChatRoomListProp {
  socket: Socket;
  setRoom: React.Dispatch<React.SetStateAction<string | null>>;
  onCreateRoomClick: (senderUID: string, receiverUID: string) => void;
  userUID: string;
}

const ChatRoomList = ({
  socket,
  setRoom,
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

  return (
    <>
      <Style.Header>
        <button onClick={() => setModalVisible(true)}>CREATE</button>
      </Style.Header>
      <nav>
        <Style.SubHeader></Style.SubHeader>
        <ul></ul>
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
