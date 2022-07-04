import * as Style from "./index.style";

const Messages = () => {
  const data = new Array(100).fill(0);

  return (
    <Style.Container>
      <Style.Panel>
        <Style.Header>asdf</Style.Header>
        <nav>
          <Style.SubHeader>asdf</Style.SubHeader>
          <ul>
            {data.map((item) => {
              return <li>asdf</li>;
            })}
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
