import "./App.css";
import LoginForm from "./Login.js";
import "./Login.css";
import SignupForm from "./Signup.js";
import "./Signup.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./Welcome.js";
import Rooms from "./Rooms.js";
import Game from "./Game.js";
import Rename from "./Rename";
function App() {
    return (
        <Router basename="/">
            <Routes>
                <Route exact path="/" Component={Welcome} />
                <Route exact path="/login" Component={LoginForm} />
                <Route exact path="/sign-up" Component={SignupForm} />
                <Route exact path="/rooms" Component={Rooms} />
                <Route exact path="/game" Component={Game} />
                <Route exact path="/Rename" Component={Rename} />
            </Routes>
        </Router>
    );
}

export default App;
