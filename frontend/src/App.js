import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import Menu from './components/menu';
import Profile from './components/profile/profile';
import CreatePlant from './components/profile/plantcreate';
import UpdatePlant from './components/profile/plantupdate';
import Admin from './components/admin/admin'; 
import CreateUser from './components/admin/usercreate';
import UpdateUser from './components/admin/userupdate';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-200">
        <Menu />
        <div className="p-6">
          <Switch>
            <Route path="/" component={Home} exact />            
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />

            {/* User */}
            <Route path="/profile" component={Profile} />
            <Route path="/createplant" component={CreatePlant} exact />
            <Route path="/updateplant/:id" component={UpdatePlant} exact />

            {/* Admin */}
            <Route path="/admin" component={Admin} />
            <Route path="/createuser" component={CreateUser} exact />
            <Route path="/updateuser/:id" component={UpdateUser} exact />
          </Switch>
        </div>
      </div>
    </Router>
    
  );
}

export default App;
