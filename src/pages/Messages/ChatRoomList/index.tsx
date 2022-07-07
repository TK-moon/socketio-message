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

import Button from "../../../components/Button";
import ChatRoomListItem from "./ChatRoomListItem";

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

  const logout = () => {
    dispatchStore({ type: "SET_LOGOUT" });
    authSessionStorage?.save({});
    navigate("/");
  };

  return (
    <>
      <Style.Header>
        <Button onClick={() => setModalVisible(true)}>대화 상대 선택</Button>
        <Button onClick={() => logout()}>LOGOUT</Button>
      </Style.Header>
      <nav>
        <Style.SubHeader></Style.SubHeader>
        <ul>
          {chatRoomList.map((item) => {
            return (
              <ChatRoomListItem
                item={item}
                userUID={userUID}
                key={item.roomId}
              />
            );
          })}
        </ul>
      </nav>
      <Modal visible={modalVisible}>
        <Style.ModalHeader>대화 상대를 선택해 주세요</Style.ModalHeader>
        <Style.ModalBody>
          <ul>
            {userList?.map((user: any) => {
              return (
                <li onClick={() => onUserListItemClick(user.id)} key={user.id}>
                  <Button block>{user.username}</Button>
                </li>
              );
            })}
          </ul>
        </Style.ModalBody>
        <Style.ModalFooter>
          <Button onClick={() => setModalVisible(false)}>CLOSE</Button>
        </Style.ModalFooter>
      </Modal>
    </>
  );
};

export default ChatRoomList;
