import React from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";
const Welcome = () => {
    document.title = "Caro game";
    const nav = useNavigate();
    return (
        <div className="container">
            <div className="LoginForm">
                <button
                    onClick={() => {
                        nav("/login");
                    }}
                >
                    Login
                </button>
                <button
                    onClick={() => {
                        nav("/sign-up");
                    }}
                >
                    Sign up
                </button>
            </div>
        </div>
    );
};
export default Welcome;
