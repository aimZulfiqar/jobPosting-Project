import React from 'react';
import './header.css';
import logo from './trimulabslogo.jpg'


const Header = () =>{
  return (
    <div className='header'>
    <div className='logo'>Trimulab's Job Posting Form</div>
   
    <div className="user-image">
    <img src={logo} alt ='user not found'></img>
    </div>
    </div>
      
  )
}
export {Header as default}