import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import {Navigate, Route, Routes} from "react-router-dom";
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import { useAuthStore } from './Store/useAuthStore';
import {Loader} from "lucide-react";
import {Toaster} from "react-hot-toast"
import { useThemeStore } from './Store/useThemeStore';
import { useChatStore } from './Store/useChatStore';

const App = () => {

  const authUserId = localStorage.getItem("authUser");
  const {authUser,isCheckingAuth, checkAuth, onlineUser} = useAuthStore();
  const {theme} = useThemeStore();

  useEffect(()=>{
    checkAuth();

  },[checkAuth]);


  if(isCheckingAuth===true && !authUser){
    return(
      <div className=' flex items-center justify-center h-screen '>
      <Loader className = "size-20 animate-spin"/>
   </div>
    )
  }

  return (
    <div data-theme = {theme}>

      <Navbar/>
      <Routes>
        <Route path='/' element={authUserId  ? <HomePage/>:<Navigate to={"/login"}/>} />
        <Route path='/signup' element={authUserId === "" || authUserId === null?<SignUpPage/>:<Navigate to={"/"}/>} />
        <Route path='/login' element={authUserId === "" || authUserId === null?<LoginPage/>:<Navigate to={'/'}/>} />
        <Route path='/settings' element={<SettingsPage/>} />
        <Route path='/profile' element={authUserId ? <ProfilePage/>:<Navigate to={"/login"}/>} />
      </Routes>

      <Toaster   
      position="top-right"
      reverseOrder={true}
      />
    </div>
  )
}

export default App