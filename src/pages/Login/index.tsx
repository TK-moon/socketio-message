import { useNavigate, useLocation, Location } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const locationState = location.state as { from: Location };
  const from = locationState.from.pathname || "/";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //   event.preventDefault();
    //   const formData = new FormData(event.currentTarget);
    //   const username = formData.get("username") as string;
    //   navigate(from, { replace: true });
  };

  return (
    <div>
      {/* <p>You must log in to view the page at {from}</p> */}

      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name="username" type="text" />
        </label>{" "}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
