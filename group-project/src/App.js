import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Register from './Components/Register';
import MenuItem from './Components/MenuItem';
import './App.css';
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
      {/* <Home /> */}
      {/* <Login /> */}
      {/* <Register /> */}
      <MenuItem items={myItems} />;
    </div>
  );
}

export default App;
