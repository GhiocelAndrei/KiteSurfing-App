import React, {useState} from 'react';
import DashBoard from './components/DashBoard';
import LoginForm from './components/LoginForm';
import axios from 'axios';
function App() {
  const [user, setUser] = useState({name:"",password:""});
  const [error, setError] = useState("");
  const [favourites, setFavourites] = useState([]);
  const Login = details => {
    setUser({name:details.name,password:details.password});
  }

  const setFav = fav => {
    setFavourites(fav)
  }
 
  
  const Logout = () => {
    setUser({name:"",password:""})
  }
 
  return (
    <div className="App">
      {
      user.name != "" ? <DashBoard favourites={favourites} name={user.name} Logout={Logout} /> 
                        : <LoginForm setFav={setFav} Login={Login} error={error} />
      }
    </div>
  );
}

export default App;
