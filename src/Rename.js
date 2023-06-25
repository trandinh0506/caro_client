import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "./Context";
import "./Rename.css";
import { domain } from "./CONSTANT";
const Rename = () => {
    const [userProps] = useContext(Context);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        newName: "",
    });
    const navi = useNavigate();
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
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
                    alert("Rename was successful !");
                    const oldProps = userProps.current;
                    userProps.current = {
                        ...oldProps,
                        name: newName,
                    };
                    navi("/rooms");
                } else {
                    alert(res.message);
                }
            });
    };

    return (
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
    );
};
export default Rename;
