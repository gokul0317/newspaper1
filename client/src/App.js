import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { Navbar } from "./Components/Navbar";
import Profile from "./Pages/Profile";
import PageContainer from "./Pages/PageContainer";
import ProtectedRoute from "./Pages/utils/ProtectedRoute"

function App() {
  return (
    <Router>
      <Navbar />
      <PageContainer>
        <Routes>
          <Route path="/" exact element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/login" element={<ProtectedRoute><Login /></ProtectedRoute>} />
          <Route path="/register" element={<ProtectedRoute><Register /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </PageContainer>
    </Router>
  );
}

export default App;
