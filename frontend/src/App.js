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
    <div className="h-screen p-6 bg-gray-200">
        <Menu />
        <Admin />
    </div>
  );
}

export default App;
