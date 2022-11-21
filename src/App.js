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
import Detail from './pages/Detail/Detail';
import Listfilm from './pages/Listfilm/Listfilm';
import Ticketroom from './pages/Ticketroom/Ticketroom';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import AddFilm from './pages/Admin/Films/AddFilm';

export const history = createBrowserHistory();
function App() {
  return (
    <Router history={history}>
      <Switch>
        <HomeTemplate exact path="/home" component={Home}/>
        <HomeTemplate exact path="/show" component={Listfilm}/>
        <HomeTemplate exact path="/profile" component={Profile}/>
        <HomeTemplate exact path="/detail/:maPhim" component={Detail}/>
        <HomeTemplate exact path="/ticketroom/:maLichChieu" component={Ticketroom}/>
        <FormTemplate  exact path="/login" component={Login}/>
        <FormTemplate  exact path="/register" component={Register}/>
        <AdminTemplate  exact path="/admin" component={Films}/>
        <AdminTemplate  exact path="/admin/addfilm" component={AddFilm}/>
        <HomeTemplate exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
