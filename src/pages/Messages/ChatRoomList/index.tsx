import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useContext } from "react";
import { StateContext } from "../../../store/authProvider";
import { getUserList } from "../../../api";
import Modal from "../../../components/Modal";
import * as Style from "./index.style";
import socket from "socket.io-client";
const io = socket("localhost:3002/chat", { path: "/io" });

const ChatRoomList = () => {
  const store = useContext(StateContext);
  const uid = store.info.id;
  const [modalVisible, setModalVisible] = useState(false);

  const { data: userList } = useQuery(["user-list"], () =>
    getUserList(store.info.id)
  );

  const onCreateRoom = (receiverUID: string) => {
    console.log(receiverUID);
  };

  useEffect(() => {}, []);

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
              <li onClick={() => onCreateRoom(user.id)} key={user.id}>
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
