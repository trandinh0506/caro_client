import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { domain } from "./CONSTANT";
import { io } from "socket.io-client";
import Context from "./Context";
import Loading from "./Loading.gif";
const LoginForm = () => {
    useEffect(() => {
        document.title = "Login";
    }, []);
    const [userProps, socket, setSocket] = useContext(Context);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    let name = useRef("");

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const response = await fetch(`${domain}login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            name.current = data.name;
            if (data.status) {
                userProps.current = {
                    name: name.current,
                    type: "idle",
                };
                setSocket(io(domain));
            } else {
                alert(data.message);
                setLoading(false);
            }
        } catch (error) {
            alert("can't connect to server");
        }
    };
    useEffect(() => {
        if (socket && userProps.current.name) {
            socket.on("connect", () => {
                socket.emit("connecting", name.current);
            });
            setLoading(false);
            navigate("/rooms");
        }
    }, [socket, navigate, userProps]);
    return (
        <div className="container">
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            autoComplete="username"
                            required
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            autoComplete="current-password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <br />
                <span>No Account ?</span>
                <span className="swich" onClick={() => navigate("/sign-up")}>
                    Sign Up
                </span>
            </div>
            {loading && (
                <div className="Loading">
                    <img src={Loading} alt="" />
                </div>
            )}
        </div>
    );
};

export default LoginForm;
