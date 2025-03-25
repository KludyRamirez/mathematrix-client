import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "./store/actions/authActions";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import PrivateRoute from "./components/PrivateRoute";
import RegisterPage from "./pages/RegisterPage";
import Matchmaking from "./components/Matchmaking";
import SinglePlayerGame from "./components/SinglePlayerGame";
import MultiPlayerGame from "./components/MultiPlayerGame";

import io from "socket.io-client";
import ForgotPage from "./pages/ForgotPage";
import ResetPage from "./pages/ResetPage";

const App = () => {
  const socket = io(process.env.REACT_APP_SOCKET_API);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = () => {
      try {
        dispatch(fetchCurrentUser());
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchUser();
  }, [dispatch]);

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontWeight: "600",
            textAlign: "center",
            border: "1px solid #606060",
            backgroundColor: "white",
          },
        }}
      />
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <PrivateRoute restricted>
                <LoginPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PrivateRoute restricted>
                <RegisterPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/forgot"
            element={
              <PrivateRoute restricted>
                <ForgotPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/reset-password/:id/:token"
            element={<ResetPage />}
          ></Route>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute roleRequired="admin">
                <AdminPage />
              </PrivateRoute>
            }
          />

          {/* <Route
            path="/matchmaking"
            element={<Matchmaking socket={socket} />}
          />
          <Route
            path="/multiplayer/:matchId"
            element={<MultiPlayerGame socket={socket} />}
          /> */}
          <Route
            path="/singleplayer"
            element={
              <PrivateRoute>
                <SinglePlayerGame />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
