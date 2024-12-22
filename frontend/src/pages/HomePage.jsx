import React, { useEffect } from 'react'
import { useChatStore } from '../Store/useChatStore';
import Sidebar from '../components/Sidebar';
import NoChatSelected from '../components/NoChatSelected';
import ChatContainer from "../components/ChatContainer.jsx"
import { useAuthStore } from '../Store/useAuthStore.js';
const HomePage = () => {

  const {selectUser} = useChatStore();
  const {checkAuth} = useAuthStore();

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  return (
    <div className='h-screen bg-base-200'>
      <div className='flex items-center justify-center pt-20 px-4'>
        <div className='bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]'>
          <div className='flex h-full rounded-lg overflow-hidden'>
            <Sidebar/>

            {!selectUser ? <NoChatSelected/>:<ChatContainer/>}

          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage