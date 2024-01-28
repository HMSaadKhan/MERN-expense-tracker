import { createContext, ReactNode, useContext, useState } from "react";

interface AppContextInterface {
  appState: IState;
  updateAppState: (newState: Partial<IState>) => void;
}

interface AppContextProviderProps {
  children: ReactNode;
}

const AppContext = createContext<AppContextInterface | null>(null);

interface IState {
  loading: boolean;
  isLoggedIn: boolean;
}

const isLoggedIn = !!localStorage.getItem("token");

const initialValues: IState = {
  loading: false,
  isLoggedIn,
};

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [appState, setAppState] = useState(initialValues);

  const updateAppState = (newState: Partial<IState>) => {
    setAppState((prev) => ({ ...prev, ...newState }));
  };

  return (
    <AppContext.Provider
      value={{
        appState,
        updateAppState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error("Please provide values to app provider");
  }

  return appContext;
};
