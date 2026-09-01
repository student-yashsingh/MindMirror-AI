// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import { motion } from "framer-motion";
// import Layout from "../components/Layout";
// import { useNavigate } from "react-router-dom";

// export default function Profile(){

// const { token, setToken } = useContext(AuthContext);
// const navigate = useNavigate();

// const [user,setUser] = useState(null);

// useEffect(()=>{

//   async function loadProfile(){
//     try{

//       const res = await axios.get(
//         "http://localhost:8000/user/profile",
//         {
//           headers:{
//             Authorization:`Bearer ${token}`
//           }
//         }
//       );

//       setUser(res.data);

//     }catch(err){
//       console.log(err);
//     }
//   }

//   loadProfile();

// },[token]);


// async function changePassword(){

//   const old_password = prompt("Enter your current password");
//   if(!old_password) return;

//   const new_password = prompt("Enter your new password");
//   if(!new_password) return;

//   try{

//     await axios.put(
//       "http://localhost:8000/user/change-password",
//       { old_password, new_password },
//       {
//         headers:{
//           Authorization:`Bearer ${token}`
//         }
//       }
//     );

//     alert("Password updated successfully");

//   }catch(err){
//     alert("Failed to change password");
//     console.log(err);
//   }

// }


// async function deleteAccount(){

//   const confirmDelete = window.confirm(
//     "Are you sure you want to delete your account? This action cannot be undone."
//   );

//   if(!confirmDelete) return;

//   try{

//     await axios.delete(
//       "http://localhost:8000/user/delete-account",
//       {
//         headers:{
//           Authorization:`Bearer ${token}`
//         }
//       }
//     );

//     alert("Account deleted successfully");

//     setToken(null);
//     localStorage.removeItem("token");

//     navigate("/login");

//   }catch(err){
//     alert("Failed to delete account");
//     console.log(err);
//   }

// }


// if(!user){
//   return(
//     <Layout>
//       <div className="flex items-center justify-center text-white">
//         Loading profile...
//       </div>
//     </Layout>
//   );
// }


// return(

// <Layout>

// <motion.div
// initial={{opacity:0,y:-20}}
// animate={{opacity:1,y:0}}
// className="mb-12"
// >

// <h1 className="text-5xl font-bold
// bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400
// bg-clip-text text-transparent">

// User Profile

// </h1>

// <p className="text-gray-400 mt-2">
// Manage your MindMirror account and personal data
// </p>

// </motion.div>


// <div className="grid grid-cols-3 gap-8 mb-12">


// <motion.div
// whileHover={{scale:1.05}}
// className="col-span-1
// bg-white/5 backdrop-blur-xl
// border border-white/10
// p-8 rounded-2xl
// flex flex-col items-center text-center"
// >

// <div className="w-24 h-24 rounded-full
// bg-gradient-to-r from-purple-500 to-indigo-500
// flex items-center justify-center
// text-3xl font-bold mb-4">

// {user.username?.charAt(0).toUpperCase()}

// </div>

// <h2 className="text-xl font-semibold">{user.username}</h2>

// <p className="text-gray-400 text-sm mt-1">
// {user.email}
// </p>

// </motion.div>



// <motion.div
// whileHover={{scale:1.03}}
// className="col-span-2
// bg-white/5 backdrop-blur-xl
// border border-white/10
// p-8 rounded-2xl"
// >

// <h2 className="text-2xl font-semibold mb-6">
// Account Information
// </h2>

// <div className="grid grid-cols-2 gap-6">

// <div>
// <p className="text-gray-400 text-sm">Username</p>
// <p className="text-lg">{user.username}</p>
// </div>

// <div>
// <p className="text-gray-400 text-sm">Email</p>
// <p className="text-lg">{user.email}</p>
// </div>

// <div>
// <p className="text-gray-400 text-sm">Account Type</p>
// <p className="text-lg">Standard</p>
// </div>

// <div>
// <p className="text-gray-400 text-sm">Member Since</p>
// <p className="text-lg">2026</p>
// </div>

// </div>

// </motion.div>

// </div>



// <div className="bg-white/5 backdrop-blur-xl
// border border-white/10
// p-10 rounded-2xl">

// <h2 className="text-2xl font-semibold mb-6">
// Account Settings
// </h2>

// <div className="flex gap-4">

// <button
// onClick={changePassword}
// className="px-6 py-3 rounded-lg
// bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600
// hover:scale-105 transition"
// >
// Change Password
// </button>

// <button
// onClick={deleteAccount}
// className="px-6 py-3 rounded-lg
// bg-red-600 hover:bg-red-700 transition"
// >
// Delete Account
// </button>

// </div>

// </div>

// </Layout>

// );
// }




import { useContext, useEffect, useState } from "react";
import axios from "axios";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await api.get("/user/profile");
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    loadProfile();
  }, [token]);

  function handleLogout() {
    setToken(null);
    navigate("/login");
  }

  async function changePassword() {
    const old_password = prompt("Enter your current password");
    if (!old_password) return;
    const new_password = prompt("Enter your new password");
    if (!new_password) return;
    try {
      await api.put(
        "/user/change-password",
        { old_password, new_password }
      );
      alert("Password updated successfully");
    } catch (err) {
      alert("Failed to change password");
      console.log(err);
    }
  }

  async function deleteAccount() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmDelete) return;
    try {
      await api.delete("/user/delete-account");
      alert("Account deleted successfully");
      setToken(null);
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      alert("Failed to delete account");
      console.log(err);
    }
  }

  if (!user) {
    return (
      <Layout>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@700;800&display=swap');
          @keyframes pulse-glow { 0%,100%{opacity:0.4} 50%{opacity:0.7} }
          @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
          @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
        `}</style>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          minHeight: "60vh", fontFamily: "'DM Sans', sans-serif",
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: 48, height: 48, borderRadius: "50%",
              border: "2px solid transparent",
              borderTopColor: "#a855f7", borderRightColor: "#6366f1",
              animation: "spin-slow 1s linear infinite",
              margin: "0 auto 16px",
            }} />
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>Loading profile...</p>
          </div>
        </div>
      </Layout>
    );
  }

  const infoFields = [
    { label: "Username", value: user.username, icon: "👤" },
    { label: "Email Address", value: user.email, icon: "✉️" },
    { label: "Account Type", value: "Standard", icon: "⭐" },
    { label: "Member Since", value: "2026", icon: "📅" },
  ];

  return (
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@700;800&display=swap');

        * { box-sizing: border-box; }

        .profile-page { font-family: 'DM Sans', sans-serif; }

        @keyframes pulse-glow { 0%,100%{opacity:0.35} 50%{opacity:0.65} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

        .glass-card {
          background: linear-gradient(145deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02));
          backdrop-filter: blur(30px);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08);
          transition: box-shadow 0.3s, transform 0.3s;
        }

        .glass-card:hover {
          box-shadow: 0 30px 80px rgba(124,58,237,0.25), inset 0 1px 0 rgba(255,255,255,0.12);
        }

        .avatar-ring {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: conic-gradient(from 0deg, #7c3aed, #6366f1, #a855f7, #7c3aed);
          animation: spin-slow 4s linear infinite;
          z-index: 0;
        }

        .info-item {
          padding: 18px 20px;
          border-radius: 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          transition: background 0.25s, border-color 0.25s, transform 0.25s;
        }

        .info-item:hover {
          background: rgba(124,58,237,0.1);
          border-color: rgba(124,58,237,0.3);
          transform: translateY(-2px);
        }

        .btn-primary {
          padding: 13px 28px;
          border-radius: 14px;
          border: none;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.3px;
          background: linear-gradient(135deg, #7c3aed, #9333ea, #4f46e5);
          color: white;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.3s;
        }

        .btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transform: translateX(-100%);
          transition: transform 0s;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 35px rgba(124,58,237,0.55);
        }

        .btn-primary:hover::after {
          animation: shimmer 0.6s ease forwards;
        }

        .btn-logout {
          padding: 13px 28px;
          border-radius: 14px;
          border: 1px solid rgba(251,191,36,0.35);
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          background: rgba(251,191,36,0.1);
          color: #fde68a;
          transition: background 0.25s, border-color 0.25s, transform 0.2s, box-shadow 0.3s;
        }

        .btn-logout:hover {
          background: rgba(251,191,36,0.22);
          border-color: rgba(251,191,36,0.55);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(251,191,36,0.2);
        }

        .btn-danger {
          padding: 13px 28px;
          border-radius: 14px;
          border: 1px solid rgba(239,68,68,0.4);
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          background: rgba(239,68,68,0.12);
          color: #fca5a5;
          transition: background 0.25s, border-color 0.25s, transform 0.2s, box-shadow 0.3s;
        }

        .btn-danger:hover {
          background: rgba(239,68,68,0.25);
          border-color: rgba(239,68,68,0.6);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(239,68,68,0.3);
        }

        .stat-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 500;
        }
      `}</style>

      <div className="profile-page">

        {/* === PAGE HEADER === */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 40 }}
        >
          {/* Breadcrumb */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            marginBottom: 16, fontSize: 13, color: "rgba(255,255,255,0.35)",
          }}>
            <span>MindMirror</span>
            <span>/</span>
            <span style={{ color: "#a78bfa" }}>Profile</span>
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(36px, 4vw, 52px)",
            fontWeight: 800,
            margin: "0 0 8px",
            background: "linear-gradient(135deg, #f5f3ff 0%, #e9d5ff 40%, #c4b5fd 70%, #a78bfa 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 4px 20px rgba(168,85,247,0.3))",
          }}>
            User Profile
          </h1>

          <p style={{ margin: 0, color: "rgba(255,255,255,0.38)", fontSize: 15 }}>
            Manage your MindMirror account and personal data
          </p>
        </motion.div>

        {/* === TOP GRID === */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: 20,
          marginBottom: 20,
        }}>

          {/* AVATAR CARD */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card"
            style={{
              padding: "36px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 16,
            }}
          >
            {/* Avatar */}
            <div style={{ position: "relative", width: 96, height: 96 }}>
              <div className="avatar-ring" />
              <div style={{
                position: "relative", zIndex: 1,
                width: 96, height: 96, borderRadius: "50%",
                background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 36, fontWeight: 700, color: "white",
                border: "3px solid #050010",
              }}>
                {user.username?.charAt(0).toUpperCase()}
              </div>
            </div>

            <div>
              <h2 style={{
                margin: "0 0 4px",
                fontSize: 20, fontWeight: 700,
                color: "rgba(255,255,255,0.95)",
              }}>
                {user.username}
              </h2>
              <p style={{
                margin: "0 0 14px",
                fontSize: 13, color: "rgba(255,255,255,0.4)",
              }}>
                {user.email}
              </p>

              {/* Status chip */}
              <div className="stat-chip" style={{
                background: "rgba(134,239,172,0.1)",
                border: "1px solid rgba(134,239,172,0.25)",
                color: "#86efac",
              }}>
                <span style={{ width: 6, height: 6, background: "#4ade80", borderRadius: "50%", display: "inline-block" }} />
                Active
              </div>
            </div>

            {/* Divider */}
            <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.06)" }} />

            {/* Mini stats */}
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "Plan", value: "Standard", icon: "⭐" },
                { label: "Joined", value: "2026", icon: "📅" },
              ].map((s, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "10px 14px", borderRadius: 12,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                    {s.icon} {s.label}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.8)" }}>
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ACCOUNT INFO CARD */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass-card"
            style={{ padding: "36px 36px" }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
              <div>
                <h2 style={{
                  margin: "0 0 4px",
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 22, fontWeight: 700,
                  color: "rgba(255,255,255,0.92)",
                }}>
                  Account Information
                </h2>
                <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
                  Your personal details and account data
                </p>
              </div>
              <div style={{
                padding: "6px 14px", borderRadius: 100,
                background: "rgba(124,58,237,0.2)",
                border: "1px solid rgba(124,58,237,0.35)",
                fontSize: 12, color: "#c084fc", fontWeight: 500,
              }}>
                Verified ✓
              </div>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
            }}>
              {infoFields.map((field, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.07 }}
                  className="info-item"
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                    <span style={{ fontSize: 13, opacity: 0.5 }}>{field.icon}</span>
                    <p style={{
                      margin: 0, fontSize: 11, fontWeight: 500, letterSpacing: "0.8px",
                      textTransform: "uppercase", color: "rgba(255,255,255,0.35)",
                    }}>
                      {field.label}
                    </p>
                  </div>
                  <p style={{ margin: 0, fontSize: 15, fontWeight: 500, color: "rgba(255,255,255,0.88)" }}>
                    {field.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* === SETTINGS CARD === */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-card"
          style={{ padding: "36px 36px" }}
        >
          <div style={{ marginBottom: 28 }}>
            <h2 style={{
              margin: "0 0 4px",
              fontFamily: "'Playfair Display', serif",
              fontSize: 22, fontWeight: 700,
              color: "rgba(255,255,255,0.92)",
            }}>
              Account Settings
            </h2>
            <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
              Manage security and account preferences
            </p>
          </div>

          {/* Setting rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
            {[
              {
                icon: "🔑",
                title: "Change Password",
                desc: "Update your login credentials",
                action: changePassword,
                actionLabel: "Update →",
                type: "primary",
              },
              {
                icon: "🚪",
                title: "Sign Out",
                desc: "Log out of your MindMirror account",
                action: handleLogout,
                actionLabel: "Logout",
                type: "logout",
              },
              {
                icon: "🗑️",
                title: "Delete Account",
                desc: "Permanently remove your account and all data",
                action: deleteAccount,
                actionLabel: "Delete Account",
                type: "danger",
              },
            ].map((row, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "18px 22px",
                borderRadius: 16,
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${row.type === "danger" ? "rgba(239,68,68,0.12)" : row.type === "logout" ? "rgba(251,191,36,0.1)" : "rgba(255,255,255,0.07)"}`,
                transition: "background 0.25s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = row.type === "danger" ? "rgba(239,68,68,0.07)" : row.type === "logout" ? "rgba(251,191,36,0.06)" : "rgba(124,58,237,0.07)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 12,
                    background: row.type === "danger" ? "rgba(239,68,68,0.12)" : row.type === "logout" ? "rgba(251,191,36,0.1)" : "rgba(124,58,237,0.15)",
                    border: `1px solid ${row.type === "danger" ? "rgba(239,68,68,0.2)" : row.type === "logout" ? "rgba(251,191,36,0.2)" : "rgba(124,58,237,0.25)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18, flexShrink: 0,
                  }}>
                    {row.icon}
                  </div>
                  <div>
                    <p style={{ margin: "0 0 2px", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.88)" }}>
                      {row.title}
                    </p>
                    <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.38)" }}>
                      {row.desc}
                    </p>
                  </div>
                </div>

                <button
                  onClick={row.action}
                  className={row.type === "danger" ? "btn-danger" : row.type === "logout" ? "btn-logout" : "btn-primary"}
                >
                  {row.actionLabel}
                </button>
              </div>
            ))}
          </div>

          {/* Warning note */}
          <div style={{
            display: "flex", alignItems: "flex-start", gap: 12,
            padding: "14px 18px",
            borderRadius: 14,
            background: "rgba(251,191,36,0.07)",
            border: "1px solid rgba(251,191,36,0.18)",
          }}>
            <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>⚠️</span>
            <p style={{ margin: 0, fontSize: 12, color: "rgba(251,191,36,0.7)", lineHeight: 1.6 }}>
              Account deletion is permanent and irreversible. All your journals, insights, and mood data will be erased immediately with no way to recover them.
            </p>
          </div>
        </motion.div>

      </div>
    </Layout>
  );
}
