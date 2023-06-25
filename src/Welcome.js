import React from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";
const Welcome = () => {
    document.title = "Caro game";
    const navigate = useNavigate();
    return (
        <div className="container">
            <div className="LoginForm">
                <button
                    onClick={() => {
                        navigate("/login");
                    }}
                >
                    Login
                </button>
                <button
                    onClick={() => {
                        navigate("/sign-up");
                    }}
                >
                    Sign up
                </button>
            </div>
        </div>
    );
};
export default Welcome;
