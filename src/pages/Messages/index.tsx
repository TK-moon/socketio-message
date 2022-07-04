import * as Style from "./index.style";
import { useQuery } from "react-query";
import { getChatRoomList } from "../../api";

const Messages = () => {
  const { data } = useQuery(["chat-room-list"], () => getChatRoomList("0"), {});
  console.log(data);

  return (
    <Style.Container>
      <Style.Panel>
        <Style.Header>asdf</Style.Header>
        <nav>
          <Style.SubHeader>asdf</Style.SubHeader>
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
