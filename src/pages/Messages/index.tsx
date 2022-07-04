import * as Style from "./index.style";
import { useQuery } from "react-query";
import { getChatRoomList, getUserList } from "../../api";
import { useState, MouseEvent, useContext } from "react";
import { StateContext } from "../../store/authProvider";

const Messages = () => {
  const store = useContext(StateContext);
  const [roomName, setRoomName] = useState("");

  const { data } = useQuery(["chat-room-list"], () => getChatRoomList("0"), {});
  const { data: userList } = useQuery(["user-list"], () =>
    getUserList(store.info.id)
  );
  console.log(userList);

  const onCreateRoomClick = (event: MouseEvent) => {
    console.log(roomName);
  };

  return (
    <Style.Container>
      <Style.Panel>
        <Style.Header>asdf</Style.Header>
        <nav>
          <Style.SubHeader>
            <input
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <button onClick={onCreateRoomClick}>CREATE</button>
          </Style.SubHeader>
          <ul>
            {/* {data.map((item) => {
              return <li>asdf</li>;
            })} */}
          </ul>
        </nav>
      </Style.Panel>
      <Style.Panel>
        <Style.Header></Style.Header>
        <section></section>
      </Style.Panel>
    </Style.Container>
  );
};

export default Messages;
