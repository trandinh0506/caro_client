import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "./Context";
import "./Costom.css";
const Costom = ({ setCostom }) => {
    const [userProps, socket] = useContext(Context);
    const [formData, setFormData] = useState({
        roomName: "",
        timeLimit: 180,
    });
    const navi = useNavigate();
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit("createCostomRoom", {
            roomName: formData.roomName,
            timeLimit: formData.timeLimit,
        });
        socket.on("getCostomRoomId", (id) => {
            userProps.current = { ...userProps.current, type: "play", id };
            navi("/game");
        });
    };
    return (
        <div className="costomWapper">
            <div className="exit" onClick={() => setCostom(false)}>
                X
            </div>
            <form onSubmit={handleSubmit} className="costomRoom">
                <div>
                    <label htmlFor="roomName">Room Name:</label>
                    <input
                        type="text"
                        id="roomName"
                        name="roomName"
                        value={formData.roomName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="timeLimit">Time Limit:</label>
                    <input
                        type="number"
                        id="timeLimit"
                        name="timeLimit"
                        value={formData.timeLimit}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button className="costomRoom_btn" type="submit">
                    Create Room
                </button>
            </form>
        </div>
    );
};
export default Costom;
