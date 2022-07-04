import { createContext, useReducer, ReactNode } from "react";
import { initSessionStorage, SESSION_STORAGE_KEYS } from "../lib/utils";

const sessionStorageForLoggedIn = initSessionStorage(SESSION_STORAGE_KEYS.AUTH);

type authProviderState = {
  isLoggedIn: boolean;
  info: {
    id: string;
    userid: string;
    username: string;
  };
};

const sessionStorageData = sessionStorageForLoggedIn?.load();
const contextInit = {
  isLoggedIn: sessionStorageData?.id ? true : false,
  info: {
    id: sessionStorageData?.id ?? "",
    userid: sessionStorageData?.userid ?? "",
    username: sessionStorageData?.username ?? "",
  },
};

export type StoreAction =
  | {
      type: "SET_LOGIN";
      value: { id: string; userid: string; username: string };
    }
  | { type: "SET_LOGOUT" };

type Dispatch = React.Dispatch<StoreAction>;

export const StateContext = createContext<authProviderState>(contextInit);
export const DispatchContext = createContext<Dispatch>(() => {});

const reducer = (
  state: authProviderState,
  action: StoreAction
): authProviderState => {
  switch (action.type) {
    case "SET_LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        info: {
          id: action.value.id,
          userid: action.value.userid,
          username: action.value.username,
        },
      };
    case "SET_LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        info: {
          id: "",
          userid: "",
          username: "",
        },
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, contextInit);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};
