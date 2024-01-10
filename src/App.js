import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
import { LinkContextProvider } from "./contexts/Link/LinkContext";
import KitchenSkin from "./pages/kitchen-skin/KitchenSkin";

function App() {
  return (
    <LinkContextProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={KitchenSkin} />
        </Switch>
      </BrowserRouter>
    </LinkContextProvider>
  );
}

export default App;
