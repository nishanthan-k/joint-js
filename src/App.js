import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
import { LinkContextProvider } from "./contexts/LinkContext";
import KitchenSkin from "./pages/kitchen-skin/KitchenSkin";
import { CanvasContextProvider } from "./contexts/CanvasContext";

function App() {
  return (
    <CanvasContextProvider>
      <LinkContextProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={KitchenSkin} />
          </Switch>
        </BrowserRouter>
      </LinkContextProvider>
    </CanvasContextProvider>
  );
}

export default App;
