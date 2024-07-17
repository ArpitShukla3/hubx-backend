import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { apiRegister } from "../../apiList";
import axios from "axios";
import { validate } from "email-validator";
export default function Signup() {
    const [email,setEmail]= useState("");
    const [password,setPassword]=useState("");
    const [cnfPassword,setCnfPassword]= useState("");
    const [name,setName] = useState("");
    const [check,setCheck]= useState(false);
    const navigateTo=useNavigate();
        function dismissAndReturn(val)
        {
            toast.dismiss();
            toast.error(val)
            return;
        }
   async function Register()
    {
        toast.loading("Processing")
        const credentials= {
            email:email,
            password:password,
            name:name
        }
        if(!email)
        {
            return dismissAndReturn("Enter email")
        }
        if(!validate(email))
        {
            return dismissAndReturn("Enter  valid email")
        }
        if(!password)
        {
            return dismissAndReturn("Enter password")
        }
        if(!cnfPassword)
        {
            return dismissAndReturn("Enter cnfPassword")
        }
        if(password!=cnfPassword)
        {
            return dismissAndReturn("Re-enter passwords")
        }
        if(!check)
        {
            return dismissAndReturn("Click checkbox")
        }
        try {
            await axios.post(apiRegister,credentials,{withCredentials:true});
            toast.dismiss();
            toast.success("Registered")
            navigateTo("/home")
        } catch (error) {
            toast.dismiss();
            toast.error(error.message)
        }
    }
        useEffect(()=>{
        const token= document.cookie.includes('token=')    ;
        if(token){
            navigateTo("/home");
        }
    },[])
    return (
      <>
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-600 text-sm font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-600 text-sm font-medium mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={cnfPassword}
            onChange={(e)=>setCnfPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="flex items-center text-gray-600 text-sm font-medium">
            <input
              type="checkbox"
              id="isHuman"
              name="isHuman"
              checked={check}
              onChange={(e)=>setCheck(!check)}
              className="mr-2"
            />
            I am a human
          </label>
        </div>

        <button
          type="submit"
          onClick={Register}
        //   onSubmit={Register}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Sign Up
        </button>
      </div>
    </div>
    <Toaster
    />
   </>
  );
  }