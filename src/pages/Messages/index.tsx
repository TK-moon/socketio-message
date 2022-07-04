import * as Style from "./index.style";
import ChatRoomList from "./ChatRoomList";

const Messages = () => {
  return (
    <>
      <Style.Container>
        <Style.Panel>
          <ChatRoomList />
        </Style.Panel>
        <Style.Panel>
          <Style.Header></Style.Header>
          <section></section>
        </Style.Panel>
      </Style.Container>
      {/* <Modal visible={modalVisible}>
        <ul>
          {userList?.map((user: any) => {
            return <li>{user.username}</li>;
          })}
        </ul>
        <div>
          <button onClick={() => setModalVisible(false)}>CLOSE</button>
        </div>
      </Modal> */}
    </>
  );
};

export default Messages;
