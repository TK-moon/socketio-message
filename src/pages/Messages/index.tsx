import * as Style from "./index.style";
import socket, { Socket } from "socket.io-client";
import { useEffect, useMemo, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StateContext } from "../../store/authProvider";
import ChatRoomList from "./ChatRoomList";
import ChatDetail from "./ChatDetail";
import { useQuery } from "react-query";
import { getChatRoomList } from "../../api";

const Messages = () => {
  const store = useContext(StateContext);
  const userInfo = store.info;
  const io: Socket = useMemo(
    () => socket("localhost:3002/chat", { path: "/io" }),
    []
  );

  const { data } = useQuery(
    ["chat-room-list", userInfo.id],
    () => getChatRoomList(userInfo.id),
    {}
  );
  console.log(data);

  const navigate = useNavigate();
  const location = useLocation();

  const [room, setRoom] = useState<string | null>(null);

  const onCreateRoomClick = (senderUID: string, receiverUID: string) => {
    io.emit("enter-room", { senderUID, receiverUID });
    setRoom(receiverUID);
    navigate(`/messages/detail#${receiverUID}`);
  };

  const onLeaveRoomClick = (senderUID: string, receiverUID: string) => {
    io.emit("leave-room", { senderUID, receiverUID });
    setRoom(null);
    navigate("/messages");
  };

  useEffect(() => {
    if (!io) return;
    console.log("asdf");
    io.on("message", (data: any) => {
      console.log("socketMessage", data);
    });
  }, []);

  return (
    <>
      <Style.Container>
        <Style.Panel>
          <ChatRoomList
            socket={io}
            setRoom={setRoom}
            onCreateRoomClick={onCreateRoomClick}
            userUID={userInfo.id}
          />
        </Style.Panel>
        <Style.Panel>
          <Routes>
            <Route
              path="/detail"
              element={
                <ChatDetail
                  socket={io}
                  onLeaveRoomClick={onLeaveRoomClick}
                  receiverUID={room as string}
                  userInfo={userInfo}
                />
              }
            ></Route>
          </Routes>
        </Style.Panel>
      </Style.Container>
    </>
  );
};

export default Messages;
