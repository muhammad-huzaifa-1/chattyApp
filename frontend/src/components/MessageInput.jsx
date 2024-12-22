import React, { useRef, useState } from 'react'
import { useChatStore } from '../Store/useChatStore';
import { Image, Send, X } from 'lucide-react';
import toast from 'react-hot-toast';

const MessageInput = () => {

  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const {sendMessages, selectUser} = useChatStore();

  const imageHandelChange = (e)=>{
    const File = e.target.files[0];

    if(!File.type.startsWith("image/")){
      toast.error("Please select image file!");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = ()=>{
      setImagePreview(reader.result);
      if(fileInputRef.current) fileInputRef.current.value = "";
    };
    reader.readAsDataURL(File)
  };
  const removeImage = ()=>{
    setImagePreview("")
  };
  let handelSendMessage = async(e)=>{
    e.preventDefault();
    try {
      if(!text.trim() && !imagePreview) return;
      setText("");
      setImagePreview("");
      await sendMessages({
        text:text.trim(),
        image:imagePreview
      });
      if(fileInputRef.current) fileInputRef.current.value = "";
    } catch (error){
      console.log(error)  
      toast.error("failed to send message! Try to reloading the page")
    }
  };
  return (
    <div className='p-4 bottom-0 w-full'>
      {
        imagePreview && (
          <div className='mb-3 flex items-center gap-2'>
            <div className=' relative '>
              <img src={imagePreview?imagePreview:""} className='w-20 h-20 object-cover rounded-lg border border-zinc-700' alt="Preview" />
              <button onClick={removeImage} className=' absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex justify-center items-center ' type='button'>
                <X className='size-3'/>
              </button>
            </div>
          </div>
        )
      }

      <form onSubmit={handelSendMessage} className=' flex items-center gap-2 '>
        <div className='flex-1 flex gap-2'>
          <input onChange={(e)=>setText(e.target.value)} type="text" placeholder='Type a message...' className='w-full input input-bordered rounded-lg input-sm sm:input-md' value={text}/>

          <input onChange={imageHandelChange} type="file"  className="hidden" ref={fileInputRef}/>
          <button type='button' onClick={()=> fileInputRef.current?.click()} className={`hidden sm:flex btn btn-circle ${imagePreview?"text-emerald-500":"text-zinc-500"}`}>
            <Image size={20}/>
          </button>
        </div>

          <button type='submit'  disabled={!text.length>0 && !imagePreview ? true : false} className={`btn btn-sm btn-circle`}>
            <Send  size={22}/>
          </button>
      </form>
    </div>
  )
}

export default MessageInput;