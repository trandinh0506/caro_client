import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { domain } from "./CONSTANT";
import Loading from "./Loading.gif";
const SignupForm = () => {
    document.title = "Sign up";
    const nav = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        Username: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();

        fetch(`${domain}signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status) {
                    setLoading(false);
                    alert(data.message);
                    nav("/login");
                } else {
                    setLoading(false);
                    alert(data.message);
                }
            })
            .catch((error) => {
                setLoading(false);
                alert("Error: Can not connect to the server!");
            });
    };

    return (
        <>
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>Sign up</h2>
                <label htmlFor="email">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                />

                <label htmlFor="name">Username</label>
                <input
                    type="text"
                    id="username"
                    name="Username"
                    value={formData.Username}
                    onChange={handleChange}
                    required
                    autoComplete="username"
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                />

                <button type="submit">Sign Up</button>
                <br />
                <br />
                <span>Already Account</span>
                <span className="switch" onClick={() => nav("/login")}>
                    Login
                </span>
            </form>
            {loading && (
                <div className="Loading">
                    <img src={Loading} alt="" />
                </div>
            )}
        </>
    );
};

export default SignupForm;
