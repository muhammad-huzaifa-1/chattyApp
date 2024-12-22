import {create} from "zustand";
import {axiosInstance} from "../lib/axios.js"
import toast from 'react-hot-toast';
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:5000";
export const useAuthStore = create((set,get)=>({

    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: false,
    onlineUser:[],
    socket:null,

    checkAuth: async()=>{
        set({isCheckingAuth: true})
        try {

            const response = await axiosInstance.get("/auth/check").catch((error)=>{
                if(error.response){
                    console.log(error.response.data.msg);
                    set({isCheckingAuth: false})
                    set({authUser: null}) 
                }
            });
            if(response) { 
                set({isCheckingAuth: false}) 
                set({authUser: response.data}) 
                set({isCheckingAuth:true});
                get().connectSocket();  
            }
        } catch (error) {
            set({isCheckingAuth: false})
            console.log("Error in CheckAuth");
        }finally{
            set({isCheckingAuth: false}) 
        }
    },

    signup : async(data)=>{
          set({isSigningUp:true});
          try {
            let result = await axiosInstance.post("/auth/signup",data).catch((error)=>{
                if(error.response){
                    set({isSigningUp:false})
                    toast.error(error.response.data.error)
                }
            });

            if(result){
                set({isSigningUp:false})
                toast.success("Account created Successfully!")
                localStorage.setItem("authUser",result.data._id);
                get().connectSocket();
            }
          } catch (error) {
            console.log(error)
          }
    },

    logout: async ()=>{
        try {
            const response = await axiosInstance.post("/auth/logout").catch((error)=>{
                if(error){
                    toast.error(error.response.data.error)
                }
            })
            if(response){
                set({authUser:null})
                toast.success("Logout Successfully!");
                localStorage.removeItem("authUser");
                get().disconnectSocket();
            }
        } catch (error) {
            toast.error(error.response.data.error)
        }
    },

    login: async (data)=>{

        set({isLoggingIn:true})
        try {
            let result = await axiosInstance.post("/auth/login",data).catch((error)=>{
                if(error.response){
                    toast.error(error.response.data.error);
                    set({isLoggingIn:false})
                }
            });
    
            if(result){
                localStorage.setItem("authUser",result.data._id);
                toast.success("Login Successfully !"); 
                setTimeout(()=>{toast.success(`Welcome! ${result.data.fullName}`)},500)
                set({isLoggingIn:false}) ;
                get().connectSocket();
            }
        } catch (error) {
            console.log(error)
        }
    },

    updatingProfile: async (data)=>{
        set({isUpdatingProfile:true})
        try {
            let response = await axiosInstance.put(`/auth/update-profile/${localStorage.getItem("authUser")}`,data)

            if(response.data){
                set({isUpdatingProfile:false})
                set({authUser:response.data});
                toast.success("Profile pic updated!")
            }
        } catch (error) {
            set({isUpdatingProfile:false})
            toast.error("Image size is too large!");
        }finally{
            set({isUpdatingProfile:false})
        }
    },

    connectSocket: ()=>{
        const {authUser} = get();
        if(!authUser || get().socket?.connected) return;
        const socket = io(BASE_URL,{
            query:{
                userId: authUser._id
            }
        });
        socket.connect();

        set({socket:socket});

        socket.on("getOnlineUsers", (userIds)=>{set({onlineUser:userIds})})
    },
    
    disconnectSocket: ()=>{
        if(get().socket?.connected) get().socket.disconnect();
        socket.on("getOnlineUsers", (userIds)=>{set({onlineUser:userIds})})
    },
}))