import { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import Details from "./components/Details/Details";
import SignupForm from "./components/SignupForm/SignupForm";
import SigninForm from "./components/SigninForm/SigninForm";
import Profile from "./components/Profile/Profile";
import CreatePinstaForm from "./components/PinstaForm/CreatePinstaForm";
import EditPinstaForm from "./components/PinstaForm/EditPinstaForm";
import Dashboard from "./components/Dashboard/Dashboard";

import * as authService from "../src/services/authService"; // import the authservice

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <div id="app-container">
          <NavBar user={user} handleSignout={handleSignout} />
          <Routes>
            {user ? (
              <>
                <Route path="/" element={<Landing user={user} />} />

                <Route
                  path="/pinstas/new"
                  element={<CreatePinstaForm user={user} />}
                />
                <Route
                  path="/pinstas/:pinstaId/edit"
                  element={<EditPinstaForm />}
                />
              </>
            ) : (
              <Route path="/" element={<Landing />} />
            )}
            <Route path="/profiles/:userId" element={<Profile />} />
            <Route path="/signup" element={<SignupForm setUser={setUser} />} />
            <Route path="/signin" element={<SigninForm setUser={setUser} />} />
            <Route path="/details/:postId" element={<Details />} />
          </Routes>
        </div>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
