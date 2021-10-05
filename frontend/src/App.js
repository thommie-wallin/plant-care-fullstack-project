import './App.css';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import Menu from './components/menu';
import Profile from './components/profile/profile';
import CreatePlant from './components/profile/plantcreate';

function App() {
  return (  
    <div className="h-screen p-6 bg-gray-200">
        <Menu />
        <CreatePlant />
    </div>
  );
}

export default App;
