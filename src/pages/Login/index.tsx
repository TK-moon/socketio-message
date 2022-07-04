import { useContext, useCallback } from "react";
import { useNavigate, useLocation, Location } from "react-router-dom";
import { initSessionStorage, SESSION_STORAGE_KEYS } from "../../lib/utils";
import { DispatchContext } from "../../store/authProvider";
import * as Style from "./index.style";
import { login } from "../../api";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const locationState = location.state as { from: Location };
  const from = locationState.from.pathname || "/";

  const dispatchStore = useContext(DispatchContext);
  const authSessionStorage = useCallback(
    () => initSessionStorage(SESSION_STORAGE_KEYS.AUTH),
    []
  )();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const form = {
      id: formData.get("id") as string,
      password: formData.get("password") as string,
      username: formData.get("username") as string,
    };

    try {
      const response = await login(form.id, form.password);
      if (!response) throw new Error("no user");
      const data = {
        id: response.id,
        userid: response.userid,
        username: response.username,
      };
      dispatchStore({
        type: "SET_LOGIN",
        value: data,
      });
      authSessionStorage?.save(data);
      navigate(from, { replace: true });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Style.Container>
      <Style.Form onSubmit={handleSubmit}>
        <label>
          <p>ID</p>
          <Style.Input name="id" type="text" />
        </label>
        <label>
          <p>PASSWORD</p>
          <Style.Input name="password" type="password" />
        </label>{" "}
        <button type="submit">Login</button>
      </Style.Form>
    </Style.Container>
  );
};

export default LoginPage;
