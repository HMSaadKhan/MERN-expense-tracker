/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext";
import AppRouter from "./components/app-router/AppRouter";

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
