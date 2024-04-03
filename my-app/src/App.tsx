import React from "react";
import "./App.css";
import MyBids from "./pages/MyBids";
import Home from "./pages/Home";
import MySales from "./pages/MySales";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sales"
          element={
            <ProtectedRoute>
              <MySales />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/bids"
          element={
            <ProtectedRoute>
              <MyBids />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </>
  );
};

export default App;
