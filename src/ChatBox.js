import React, {
    useContext,
    useState,
    useEffect,
    useRef,
    useLayoutEffect,
} from "react";
import Context from "./Context";
import Input from "./Input";
import "./ChatBox.css";

const ChatBox = () => {
    const [userProps, socket] = useContext(Context);
    const [messages, setMessages] = useState([]);
    const id = userProps.current.id;
    const ulRef = useRef(null);

    useEffect(() => {
        socket.emit("getAllMessages", id);
        socket.on("allMessagesReceived", (M) => {
            setMessages(M);
        });
        socket.on("receiveMessage", (M) => {
            setMessages(M);
        });

        return () => {
            socket.off("allMessagesReceived");
            socket.off("receiveMessage");
        };
    }, [id, socket]);

    useLayoutEffect(() => {
        if (ulRef.current) {
            ulRef.current.scrollTop = ulRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="chat_box">
            <ul className="message_container" ref={ulRef}>
                {messages.map((message, index) => (
                    <li key={index}>
                        <span className="chat_name">{message.name}</span>
                        <span>: </span>
                        <span className="chat_message">
                            {" "}
                            {message.message.trim()}{" "}
                        </span>
                    </li>
                ))}
            </ul>
            <Input />
        </div>
    );
};

export default ChatBox;
