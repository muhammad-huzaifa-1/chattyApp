import React, { useEffect, useState } from 'react';
import {useAuthStore} from "../Store/useAuthStore.js"
import { Eye, EyeClosed, Loader2, Lock, Mail, MessageSquare, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern.jsx';

const LoginPage = () => {

  const {login,isLoggingIn} = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email:"",
    password:""
  });

  const showPass = ()=>{
    showPassword === false ? setShowPassword(true) : setShowPassword(false);
    // if (showPassword===false) {
    //   setShowPassword(true)
    // } else {
    //   setShowPassword(false)
    // }
  }

  const onSubmitForm = async(e)=>{
    e.preventDefault()
    login(formData)
  }

  return (
    <div className=' max-h-screen h-screen  grid lg:grid-cols-2 '>

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
                  <h1 className=' text-2xl font-bold mt-2 '>Welcome Back</h1>
                  <p className=' text-base-content/60 '>Sign in to your account</p>
                </div>
              </div>

              {/* Form Design  */}
              <form onSubmit={onSubmitForm} className=' space-y-6 mt-10 '>
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

                <button type='submit' className='btn btn-primary w-full' disabled={isLoggingIn}>
                  {
                    isLoggingIn?(<><Loader2 className=' size-5 animate-spin'/>Loading</>):("Login")
                  }
                </button>
              </form>

              <div className='text-center mt-6'>
                <p className='text-base-content/60'>
                  Don't have an account? {""}
                  <Link to={'/signup'} className='link link-primary'>
                   Sign up
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

export default LoginPage