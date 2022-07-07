import { useCallback, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getUserList } from "../../../api";
import Modal from "../../../components/Modal";
import * as Style from "./index.style";
import { Socket } from "socket.io-client";
import { Link, useNavigate } from "react-router-dom";

import { ChatRoomListInerface } from "../../../hooks/useChatRoomList";
import { DispatchContext } from "../../../store/authProvider";
import { initSessionStorage, SESSION_STORAGE_KEYS } from "../../../lib/utils";

interface ChatRoomListProp {
  chatRoomList: ChatRoomListInerface[];
  socket: Socket;
  onCreateRoomClick: (receiverUID: string) => void;
  userUID: string;
}

const ChatRoomList = ({
  chatRoomList,
  socket,
  onCreateRoomClick,
  userUID,
}: ChatRoomListProp) => {
  const navigate = useNavigate();
  const dispatchStore = useContext(DispatchContext);
  const authSessionStorage = useCallback(
    () => initSessionStorage(SESSION_STORAGE_KEYS.AUTH),
    []
  )();
  const [modalVisible, setModalVisible] = useState(false);

  const { data: userList } = useQuery(["user-list"], () =>
    getUserList(userUID)
  );

  const onUserListItemClick = (userUID: string) => {
    onCreateRoomClick(userUID);
    setModalVisible(false);
  };

  const getRoomAnchorHash = (item: ChatRoomListInerface, UID: string) => {
    return String(item.senderUID) === String(UID)
      ? String(item.receiverUID)
      : String(item.senderUID);
  };

  const logout = () => {
    dispatchStore({ type: "SET_LOGOUT" });
    authSessionStorage?.save({});
    navigate("/");
  };

  return (
    <>
      <Style.Header>
        <button onClick={() => setModalVisible(true)}>CREATE</button>
        <button onClick={() => logout()}>LOGOUT</button>
      </Style.Header>
      <nav>
        <Style.SubHeader></Style.SubHeader>
        <ul>
          {chatRoomList.map((item) => {
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
          })}
        </ul>
      </nav>
      <Modal visible={modalVisible}>
        <ul>
          {userList?.map((user: any) => {
            return (
              <li onClick={() => onUserListItemClick(user.id)} key={user.id}>
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
