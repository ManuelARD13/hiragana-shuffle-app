import React from "react";
import "./sass/main.scss";
import AppUI from "./layout/AppUI/AppUI";
import { AppProvider } from "./context/AppContext";

function App(): JSX.Element {
  return (
    <>
      <AppProvider>
        <AppUI />
      </AppProvider>
    </>
  );
}

export default App;
