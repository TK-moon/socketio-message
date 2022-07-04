import { createContext, useReducer, ReactNode } from "react";
import { initSessionStorage, SESSION_STORAGE_KEYS } from "../lib/utils";

const sessionStorageForLoggedIn = initSessionStorage(SESSION_STORAGE_KEYS.AUTH);

type authProviderState = {
  isLoggedIn: boolean;
  info: {
    id: string;
    password: string;
    userName: string;
  };
};

const sessionStorageData = sessionStorageForLoggedIn?.load();
const contextInit = {
  isLoggedIn: sessionStorageData?.id ? true : false,
  info: {
    id: sessionStorageData?.id ?? "",
    password: sessionStorageData?.password ?? "",
    userName: sessionStorageData?.userName ?? "",
  },
};

export type StoreAction =
  | {
      type: "SET_LOGIN";
      value: { id: string; password: string; userName: string };
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
          password: action.value.password,
          userName: action.value.userName,
        },
      };
    case "SET_LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        info: {
          id: "",
          password: "",
          userName: "",
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
