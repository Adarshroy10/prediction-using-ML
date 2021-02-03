import {BrowserRouter as Router , Route , Redirect , Switch} from 'react-router-dom';
import Login from './components/login'
import SignUp from './components/signup'
import Home from './components/home'
import Vote from './components/vote';
import {useState} from 'react';
import {auth} from './utils/firebase';

function App() {
  const [user , setUser] = useState(auth.currentUser)
  auth.onAuthStateChanged((usr) => {setUser(usr)})
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home user={user} />
        </Route>
        <Route path="/login" exact>
         { user?<Redirect to="/"/> : <Login/> }
        </Route>
        <Route path="/signup" exact>
        { user?<Redirect to="/"/> : <SignUp/> }
        </Route>
        <Route path="/vote" exact >
      <Vote user={user}/> 
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
