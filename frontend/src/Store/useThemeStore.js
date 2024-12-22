import { create } from "zustand";

export const useThemeStore = create((set)=>({

    theme: localStorage.getItem("chat-theme") ||"coffee",

    setTheme : (theme)=>{
        set({theme:theme});
        localStorage.setItem("chat-theme",theme);
    }
}))