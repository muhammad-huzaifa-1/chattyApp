import {create} from "zustand";
import toast from "react-hot-toast";
import {axiosInstance} from "../lib/axios.js";
import {useAuthStore} from "./useAuthStore.js"

export const useChatStore = create((set,get)=>({
    messages:[],
    users:[],
    selectUser: null,
    isUserLoading:false,
    isMessagesLoading:false,

    getUser: async ()=>{
        set({isUserLoading:true})
        try {
            
            const result = await axiosInstance.get(`/messages/user/${localStorage.getItem("authUser")}`);
            
                set({users:result.data});
                set({isUserLoading:false})
        } catch (error) {
            set({isUserLoading:false})
        }finally{
            set({isUserLoading:false})
        }
    },
    sendMessages: async(messageData)=>{

        const {selectUser, messages} = get()
        try {
            let response = await axiosInstance.post(`/messages/send/${selectUser._id}/${localStorage.getItem("authUser")}`, messageData);
                set({messages:[...messages,response.data]})

        } catch (error) {
            toast.error("something went wrong");
            console.log(error)
        }
    },
    getMessages: async(userId)=>{
        set({isMessagesLoading:true});
        try {
            const response = await axiosInstance.get(`/messages/${localStorage.getItem("authUser")}/${userId}`)
            if(response.data){
                set({isMessagesLoading: false});
                set({messages: response.data});
            }
        }catch (error) {
            toast.error(error.response.data.error)
        }finally{
            set({isMessagesLoading:false});
        }
    },
    subscribeToMessages: ()=>{
        const {selectUser} = get();
        if(!selectUser) return;

        const socket = useAuthStore.getState().socket;
        socket.on("newMessage", (newMessage)=>{
            if(newMessage.senderId !== selectUser._id) return;
            set({messages:[...get().messages,newMessage]})
        })
    },

    unsubscribeFromMessages: ()=>{
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    setSelectedUser: (selectUser)=>{set({selectUser:selectUser})}
}))
