import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import MenuItem from './components/MenuItem';
import './styles/App.css';
function App() {
  const myItems = [
    {
      item: 'burger',
      price: 10.99,
    },
    {
      item: 'pop',
      price: 1.99,
    },
  ];

  return (
    <div className='App'>
      <Navbar />
      <Home />
      <Login />
      <Register />
      <MenuItem items={myItems} />
    </div>
  );
}

export default App;
