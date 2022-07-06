import * as Style from "./index.style";
import socket, { Socket } from "socket.io-client";
import { useEffect, useMemo, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StateContext } from "../../store/authProvider";
import ChatRoomList from "./ChatRoomList";
import ChatDetail from "./ChatDetail";
import useChatRoomList from "../../hooks/useChatRoomList";

const Messages = () => {
  const store = useContext(StateContext);
  const userInfo = store.info;
  const io: Socket = useMemo(
    () => socket("localhost:3002/chat", { path: "/io" }),
    []
  );
  const { hash, key } = useLocation();
  const { data: chatRoomList } = useChatRoomList(userInfo.id);

  const navigate = useNavigate();

  const onCreateRoomClick = (receiverUID: string) => {
    navigate(`/messages/detail#${receiverUID}`);
  };

  const onLeaveRoomClick = () => {
    navigate("/messages");
  };

  useEffect(() => {}, []);

  return (
    <>
      <Style.Container>
        <Style.PanelContainer isInRoom={Boolean(hash)}>
          <Style.Panel>
            <ChatRoomList
              chatRoomList={chatRoomList}
              socket={io}
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
                    userInfo={userInfo}
                    key={key}
                  />
                }
              ></Route>
            </Routes>
          </Style.Panel>
        </Style.PanelContainer>
      </Style.Container>
    </>
  );
};

export default Messages;
