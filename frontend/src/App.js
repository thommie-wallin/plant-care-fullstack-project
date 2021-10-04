import './App.css';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import Menu from './components/menu';
import Profile from './components/profile/profile';

function App() {
  return (  
    <div className="h-screen p-6 bg-gray-200">
        <Menu />
        <Profile />
    </div>
  );
}

export default App;
