import React, { useState, useContext, useRef } from "react";
import Context from "./Context";
import "./Input.css";
const Input = () => {
    const [message, setMessage] = useState("");
    const [userProps, socket] = useContext(Context);
    const { id, name } = userProps.current;
    const inputRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message !== "") socket.emit("sendData", { id, name, message });
        setMessage("");
        inputRef.current.focus();
    };

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                ref={inputRef}
                className="input_message"
                onChange={handleChange}
                value={message}
            />
            <button className="submitchat_btn" type="submit">
                Send
            </button>
        </form>
    );
};

export default Input;
