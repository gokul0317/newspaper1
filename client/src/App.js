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
import Bookmarks from "./Pages/Bookmarks";
import BlockUnAuth from "./Pages/utils/BlockUnAuth";
import Addnews from "./Pages/Addnews";

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
          <Route path="/news" element={<ProtectedRoute><BlockUnAuth><News /></BlockUnAuth></ProtectedRoute>} />
          <Route path="/add/news" element={<ProtectedRoute><BlockUnAuth><Addnews /></BlockUnAuth></ProtectedRoute>} />
          <Route path="/bookmarks" element={<ProtectedRoute><BlockUnAuth><Bookmarks /></BlockUnAuth></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </PageContainer>
    </Router>
  );
}

export default App;
