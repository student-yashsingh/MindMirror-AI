import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

export default function Profile(){

const { token, setToken } = useContext(AuthContext);
const navigate = useNavigate();

const [user,setUser] = useState(null);

useEffect(()=>{

  async function loadProfile(){
    try{

      const res = await axios.get(
        "http://localhost:8000/user/profile",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      setUser(res.data);

    }catch(err){
      console.log(err);
    }
  }

  loadProfile();

},[token]);


async function changePassword(){

  const old_password = prompt("Enter your current password");
  if(!old_password) return;

  const new_password = prompt("Enter your new password");
  if(!new_password) return;

  try{

    await axios.put(
      "http://localhost:8000/user/change-password",
      { old_password, new_password },
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

    alert("Password updated successfully");

  }catch(err){
    alert("Failed to change password");
    console.log(err);
  }

}


async function deleteAccount(){

  const confirmDelete = window.confirm(
    "Are you sure you want to delete your account? This action cannot be undone."
  );

  if(!confirmDelete) return;

  try{

    await axios.delete(
      "http://localhost:8000/user/delete-account",
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

    alert("Account deleted successfully");

    setToken(null);
    localStorage.removeItem("token");

    navigate("/login");

  }catch(err){
    alert("Failed to delete account");
    console.log(err);
  }

}


if(!user){
  return(
    <Layout>
      <div className="flex items-center justify-center text-white">
        Loading profile...
      </div>
    </Layout>
  );
}


return(

<Layout>

<motion.div
initial={{opacity:0,y:-20}}
animate={{opacity:1,y:0}}
className="mb-12"
>

<h1 className="text-5xl font-bold
bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400
bg-clip-text text-transparent">

User Profile

</h1>

<p className="text-gray-400 mt-2">
Manage your MindMirror account and personal data
</p>

</motion.div>


<div className="grid grid-cols-3 gap-8 mb-12">


<motion.div
whileHover={{scale:1.05}}
className="col-span-1
bg-white/5 backdrop-blur-xl
border border-white/10
p-8 rounded-2xl
flex flex-col items-center text-center"
>

<div className="w-24 h-24 rounded-full
bg-gradient-to-r from-purple-500 to-indigo-500
flex items-center justify-center
text-3xl font-bold mb-4">

{user.username?.charAt(0).toUpperCase()}

</div>

<h2 className="text-xl font-semibold">{user.username}</h2>

<p className="text-gray-400 text-sm mt-1">
{user.email}
</p>

</motion.div>



<motion.div
whileHover={{scale:1.03}}
className="col-span-2
bg-white/5 backdrop-blur-xl
border border-white/10
p-8 rounded-2xl"
>

<h2 className="text-2xl font-semibold mb-6">
Account Information
</h2>

<div className="grid grid-cols-2 gap-6">

<div>
<p className="text-gray-400 text-sm">Username</p>
<p className="text-lg">{user.username}</p>
</div>

<div>
<p className="text-gray-400 text-sm">Email</p>
<p className="text-lg">{user.email}</p>
</div>

<div>
<p className="text-gray-400 text-sm">Account Type</p>
<p className="text-lg">Standard</p>
</div>

<div>
<p className="text-gray-400 text-sm">Member Since</p>
<p className="text-lg">2026</p>
</div>

</div>

</motion.div>

</div>



<div className="bg-white/5 backdrop-blur-xl
border border-white/10
p-10 rounded-2xl">

<h2 className="text-2xl font-semibold mb-6">
Account Settings
</h2>

<div className="flex gap-4">

<button
onClick={changePassword}
className="px-6 py-3 rounded-lg
bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600
hover:scale-105 transition"
>
Change Password
</button>

<button
onClick={deleteAccount}
className="px-6 py-3 rounded-lg
bg-red-600 hover:bg-red-700 transition"
>
Delete Account
</button>

</div>

</div>

</Layout>

);
}