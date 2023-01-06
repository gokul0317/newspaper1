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
import News from "./Pages/News";
import { Navbar } from "./Components/Navbar";
import Profile from "./Pages/Profile";
import PageContainer from "./Pages/PageContainer";
import ProtectedRoute from "./Pages/utils/ProtectedRoute";
import BlockUnAuth from "./Pages/utils/BlockUnAuth";

function App() {
  return (
    <Router>
      <Navbar />
      <PageContainer>
        <Routes>
          <Route path="/" exact element={<ProtectedRoute><BlockUnAuth><Dashboard /></BlockUnAuth></ProtectedRoute>} />
          <Route path="/login" element={<ProtectedRoute><Login /></ProtectedRoute>} />
          <Route path="/register" element={<ProtectedRoute><Register /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><BlockUnAuth><Profile /></BlockUnAuth></ProtectedRoute>} />
          <Route path="/news/:id" element={<ProtectedRoute><BlockUnAuth><News /></BlockUnAuth></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </PageContainer>
    </Router>
  );
}

export default App;
