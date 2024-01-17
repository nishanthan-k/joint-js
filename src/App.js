import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
import { OptionContextProvider } from "./contexts/OptionContext";
import KitchenSkin from "./pages/kitchen-skin/KitchenSkin";
import { CanvasContextProvider } from "./contexts/CanvasContext";

function App() {
  return (
    <CanvasContextProvider>
      <OptionContextProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={KitchenSkin} />
          </Switch>
        </BrowserRouter>
      </OptionContextProvider>
    </CanvasContextProvider>
  );
}

export default App;
