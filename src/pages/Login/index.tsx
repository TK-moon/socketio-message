import { useContext, useCallback } from "react";
import { useNavigate, useLocation, Location } from "react-router-dom";
import { initSessionStorage, SESSION_STORAGE_KEYS } from "../../lib/utils";
import { DispatchContext } from "../../store/authProvider";
import * as Style from "./index.style";

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const form = {
      id: formData.get("id") as string,
      password: formData.get("password") as string,
      username: formData.get("username") as string,
    };

    dispatchStore({ type: "SET_LOGIN", value: form });
    authSessionStorage?.save(form);
    navigate(from, { replace: true });
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
        <label>
          <p>USERNAME</p>
          <Style.Input name="username" type="text" autoComplete="nope" />
        </label>{" "}
        <button type="submit">Login</button>
      </Style.Form>
    </Style.Container>
  );
};

export default LoginPage;
