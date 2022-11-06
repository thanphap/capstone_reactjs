import logo from './logo.svg';
import './App.css';
import { Router, Switch } from 'react-router-dom';

import { createBrowserHistory } from 'history'
import { HomeTemplate } from './templates/HomeTemplate';
import { FormTemplate } from './templates/FormTemplate';
import { AdminTemplate } from './templates/AdminTemplate';
import Home from './pages/Home/Home';
import Films from './pages/Admin/Films/Films';
import Login from './pages/Login/Login';

export const history = createBrowserHistory();
function App() {
  return (
    <Router history={history}>
      <Switch>
        <HomeTemplate exact path="/home" component={Home}/>
        <FormTemplate  exact path="/login" component={Login}/>
        <AdminTemplate  exact path="/admin" component={Films}/>
        <HomeTemplate exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
