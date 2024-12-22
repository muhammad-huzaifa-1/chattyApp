import React, { useState } from 'react'
import { useAuthStore } from '../Store/useAuthStore';
import {Link, useNavigate} from "react-router-dom"
import {Eye, EyeClosed, Mail, MessageSquare, User, Lock, Loader2} from "lucide-react";
import AuthImagePattern from '../components/AuthImagePattern';
import toast from 'react-hot-toast';
const SignUpPage = () => {

  const {signup, isSigningUp} = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName:"",
    email:"",
    password:""
  });


  // Form functions
  // const validation = ()=>{
  //   if(!formData.fullName) return toast.error("Full Name is required!");
  //   if(!formData.email) return toast.error("email is required!");
  //   if(!formData.password) return toast.error("password is required!")
  //   if(formData.password.length < 6) return toast.error("password must be greate than 6 characters!")
      
  //   return true;
  // };
  const onSubmitForm = async(e)=>{
    e.preventDefault();
    signup(formData);

  };
  const showPass = ()=>{
    showPassword===false?setShowPassword(true):setShowPassword(false);
  }

  return (
    <div className=' max-h-screen h-screen grid lg:grid-cols-2 '>

      {/* Left Side of the Form */}
        <div className='flex flex-col justify-center items-center p-6 sm:p-12 '>

           <div className='w-full max-w-md space-y-8'>
            <div className='text-center mb-8 '>

              {/* Logo and form header design  */}
              <div className='flex flex-col items-center gap-2 group'>
                <div className=' size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors '>
                 <MessageSquare className=' size-6 text-primary '/>
                </div>
                <div>
                  <h1 className=' text-2xl font-bold mt-2 '>Create Account</h1>
                  <p className=' text-base-content/60 '>Get started with your free account</p>
                </div>
              </div>

              {/* Form Design  */}
              <form onSubmit={onSubmitForm} className=' space-y-6 '>
                <div className=' form-control '>
                  <label className=' label '>
                    <span className=' label-text font-medium '> Full Name</span>
                  </label>
                  <div className=' relative '>
                    <div className=' absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none '>
                      <User className=' size-5 text-base-content/40 '/>
                    </div>

                    <input
                      type="text"
                      className=' input input-bordered w-full pl-10 ' 
                      placeholder='John Doe' 
                      value={formData.fullName}
                      onChange={(e)=>setFormData({...formData,fullName:e.target.value })}
                    />

                  </div>
                </div>

                <div className=' form-control '>
                  <label className=' label '>
                    <span className=' label-text font-medium '> Email</span>
                  </label>
                  <div className=' relative '>
                    <div className=' absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none '>
                      <Mail className=' size-5 text-base-content/40 '/>
                    </div>

                    <input
                      type="email"
                      className=' input input-bordered w-full pl-10 ' 
                      placeholder='you@example.com' 
                      value={formData.email}
                      onChange={(e)=>setFormData({...formData,email:e.target.value.toLocaleLowerCase() })}
                    />

                  </div>
                </div>

                <div className=' form-control '>
                  <label  className=' label '>
                    <span className=' label-text font-medium '> Password</span>
                  </label>
                  <div className=' relative '>
                    <div className='cursor-pointer absolute inset-y-0 left-0 pl-3 flex items-center  '>
                      <Lock className=' size-5 text-base-content/40 '/>
                    </div>

                    <input
                      type={showPassword===true?"text":"password"}
                      className=' input input-bordered w-full pl-10 ' 
                      placeholder='password' 
                      value={formData.password}
                      onChange={(e)=>setFormData({...formData,password:e.target.value })}
                    />
                    <button
                     onClick={showPass}
                     type='button'
                     className=' absolute inset-y-0 right-0 pr-3 flex items-center'
                    >
                      {
                        showPassword===false?<EyeClosed className=' size-5 text-base-content/40'/>:<Eye className=' size-5 text-base-content/40'/>
                      }
                    </button>
                  </div>
                </div>

                <button type='submit' className='btn btn-primary w-full' disabled={isSigningUp}>
                  {
                    isSigningUp?(<><Loader2 className=' size-5 animate-spin'/>Loading</>):("Create Account")
                  }
                </button>
              </form>

              <div className='text-center mt-6'>
                <p className='text-base-content/60'>
                  Already have an account? {""}
                  <Link to={'/login'} className='link link-primary'>
                   Sign in
                  </Link>
                </p>
              </div>
            </div>
           </div>

        </div>

      {/* Right Side of the Form */}
        <AuthImagePattern
          title="Join our community"
          subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
        />

    </div>
  )
}

export default SignUpPage