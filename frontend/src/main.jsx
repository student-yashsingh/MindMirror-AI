import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="997231287821-iedogbea8losmshsq5rqnk76gepj45pc.apps.googleusercontent.com">
    <AuthProvider>
      <App />
    </AuthProvider>
  </GoogleOAuthProvider>
);