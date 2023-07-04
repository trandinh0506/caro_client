import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Context from "./Context";
import "./Rename.css";
import { domain } from "./CONSTANT";
import Loading from "./Loading.gif";
const Rename = () => {
    const [userProps] = useContext(Context);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        newName: "",
    });
    const [loading, setloading] = useState(false);
    useEffect(() => {
        document.title = "Rename";
    }, []);
    const nav = useNavigate();
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        setloading(true);
        event.preventDefault();
        const { username, password, newName } = formData;
        fetch(domain + "rename", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
                newName,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.status) {
                    setloading(false);
                    alert("Rename was successful!");
                    const oldProps = userProps.current;
                    userProps.current = {
                        ...oldProps,
                        name: newName,
                    };
                    nav("/rooms");
                } else {
                    setloading(false);
                    alert(res.message);
                }
            });
    };
    const handleBack = () => {
        nav("/rooms");
    };
    return (
        <>
            <button onClick={handleBack} className="back">
                Back
            </button>
            <form onSubmit={handleSubmit} className="renameForm">
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        autoComplete=""
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete=""
                        required
                    />
                </div>

                <div>
                    <label htmlFor="newName">New Name:</label>
                    <input
                        id="newName"
                        name="newName"
                        value={formData.newName}
                        onChange={handleChange}
                        autoComplete=""
                        required
                    />
                </div>

                <button type="submit">Submit</button>
            </form>
            {loading && (
                <div className="Loading">
                    <img src={Loading} alt="" />
                </div>
            )}
        </>
    );
};
export default Rename;
