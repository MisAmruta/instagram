import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter,Route, Switch,useHistory} from 'react-router-dom';
import Home from './components/screen/Home';
import Profile from './components/screen/Profile';
import Signup from './components/screen/Signup';
import Signin from './components/screen/Signin';
import CreatePost from './components/screen/CreatePost';
import UserProfile from './components/screen/UserProfile';
import SubpostUser from './components/screen/SubpostUser'
import React,{useEffect,useContext,useReducer,createContext} from 'react';
import {reducer,initialState} from './reducers/userReducer'

export const Usercontext = createContext()

const Routing=()=>{
  const history = useHistory()
   const {state,dispatch} = useContext(Usercontext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      // history.push('/')
    }
    else{
      history.push('/signin')
    }
  },[])
  return(
   
      <Switch>
          <Route exact path="/">
     <Home />
   </Route>
   <Route exact path="/profile">
     <Profile />
   </Route>
   <Route path="/signup">
     <Signup />
   </Route>
   <Route path="/signin">
     <Signin />
   </Route>
   <Route path="/create">
     <CreatePost />
   </Route>
   <Route path="/profile/:userid">
     <UserProfile />
   </Route>
   <Route path="/myfollowingpost">
     <SubpostUser />
   </Route>
   
      </Switch>
    
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <Usercontext.Provider value={{state,dispatch}}>
   <BrowserRouter>

   <Navbar />
   <Routing />

   </BrowserRouter>
   </Usercontext.Provider>
  );
}

export default App;
