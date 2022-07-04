import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Main from "./pages/Main";
import LoginPage from "./pages/Login";
import Messages from "./pages/Messages";

const PrivateRoute = ({ children, ...rest }: { children: JSX.Element }) => {
  const isLoggedIn = false;
  const location = useLocation();

  if (!isLoggedIn)
    return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/messages"
          element={
            <PrivateRoute>
              <Messages />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
