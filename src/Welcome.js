import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";
const Welcome = () => {
    document.title = "Caro game";
    const navigate = useNavigate();
    const [show, setShow] = useState(true);
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
            {show && (
                <div className="warning" onClick={() => setShow(false)}>
                    <div className="attention">Attention!</div>
                    <div className="message_warning">
                        This Website Still Has A Serious Error
                    </div>
                    <div className="message_warning">
                        Please Avoid Reloading The Website While Using It!
                    </div>
                </div>
            )}
        </div>
    );
};
export default Welcome;
