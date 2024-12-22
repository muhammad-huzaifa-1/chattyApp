import React, { useEffect, useRef } from 'react';
import { useChatStore } from '../Store/useChatStore';
import MessageSkeleton from "../components/MessageSkeleton.jsx"
import ChatHeader from './ChatHeader.jsx';
import MessageInput from './MessageInput.jsx';
import avatarPic from "./avatar.png"
import { formatMessageTime } from '../lib/utils.js';
import { useAuthStore } from '../Store/useAuthStore.js';
import { MessageSquare } from 'lucide-react';

const ChatContainer = () => {
  const {getMessages,messages,isMessagesLoading,selectUser,subscribeToMessages,unsubscribeFromMessages} = useChatStore();
  const {authUser, checkAuth} = useAuthStore();
  const messageRef = useRef(null);

  const cutName = selectUser.fullName.split(" ");

  useEffect(()=>{
    checkAuth()
    getMessages(selectUser._id);
    subscribeToMessages();

    return ()=>unsubscribeFromMessages();

  },[selectUser._id,getMessages,checkAuth,subscribeToMessages,unsubscribeFromMessages]);

  useEffect(()=>{
    if(messageRef.current && messages){
      messageRef.current.scrollIntoView({behavior:"smooth"});
    }
  },[messages])

  if(isMessagesLoading){
    return(
      <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader/>
        <MessageSkeleton/>
        <MessageInput/>
      </div>
    )
  }

  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader/>

      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
      <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-18 h-18 border-[3px] border-primary  rounded-full flex items-center
             justify-center animate-bounce"
            >
              <img className='rounded-full object-cover size-16' src={selectUser.profilePic!==""?selectUser.profilePic:avatarPic} alt="" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">Say &#128075; to {cutName!==""?cutName[0]:selectUser.fullName}</h2>
        <p className="text-base-content/60">
          Start your legendary chatting with<span className='font-bold'> {selectUser.fullName}</span>
        </p>
      </div>
    </div>
        {messages&& messages.length>0?messages.map((message)=>{
          return(<>
           <div key={message._id} ref={messageRef} className={`chat ${message.senderId === authUser._id ? "chat-end":"chat-start"}`}>
            <div className='chat-image avatar'>
              <div className=' size-10 rounded-full border '>
                <img src={message.senderId === authUser._id?authUser.profilePic || avatarPic :selectUser.profilePic || avatarPic } alt="Profile pic" />
              </div>
            </div>

            <div className='chat-header mb-1'>
              <time className='text-xs opacity-50 ml-1 '>{formatMessageTime(message.createdAt)}</time>
            </div>
            <div className=' chat-bubble flex flex-col  '>
              {message.image && (<img src={message.image} alt='Attachment' className='sm:max-w-[200px] rounded-md mb-2'/>)}
              {message.text && (<p>{message.text}</p>)}
            </div>
           </div>
          </>)
        }):""}
      </div>

      <MessageInput/>
    </div>
  )
}

export default ChatContainer