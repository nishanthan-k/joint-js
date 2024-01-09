import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import './App.scss';
import KitchenSkin from './pages/kitchen-skin/KitchenSkin';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={KitchenSkin} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
