import React,{useContext} from 'react';
import {Link , useHistory } from 'react-router-dom';
import {Usercontext} from '../App'

const Navbar=()=>{
  const {state,dispatch}=  useContext(Usercontext)
  const history = useHistory()
  const renderList = ()=>{
    if(state){
        return [
          <li><Link to="/profile">Profile</Link></li> ,
          <li><Link to="/create">create Post</Link></li>,
          <li><Link to="/myfollowingpost"> my following posts </Link></li>,
          <li>
            <button className="btn #d32f2f red darken-2" type="submit" name="action" 
                onClick={()=>{
                  localStorage.clear()
                  dispatch({type:"CLEAR"})
                  history.push('/signin')
                }}>
            LogOut
        </button>
          </li>
        ]
    }else{
          return[
            <li><Link to="/signin">Sign In</Link></li> ,
        <li><Link to="/signup">Sign Up</Link></li>
          ]
    }
  }
    return(
        <nav>
    <div className="nav-wrapper white">
      <Link to={state?"/":"/signin"} className="brand-logo left">Instagram</Link>
      <ul id="nav-mobile" className="right ">
        {renderList()}
       
      </ul>
    </div>
  </nav>
    )
}

export default Navbar