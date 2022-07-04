import { Link } from "react-router-dom";
import * as Style from "./index.style";

const Main = () => {
  return (
    <Style.Container>
      <Link to="/messages">Messages</Link>
    </Style.Container>
  );
};

export default Main;
