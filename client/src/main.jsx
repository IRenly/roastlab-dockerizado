import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import { AuthProvider } from "./auth/AuthContext";
import { AppRouter } from "./router/AppRouter";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
      <AuthProvider>
      <Router>
        <AppRouter />
        </Router>
      </AuthProvider>
    
  </React.StrictMode>
);
