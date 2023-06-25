import { useState, useEffect, useContext } from "react";
import "./Rooms.css";
import { useNavigate } from "react-router-dom";
import Context from "./Context";
import Costom from "./Costom";
const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [costom, setCostom] = useState(false);
    const [userProps, socket] = useContext(Context);
    const nav = useNavigate();
    useEffect(() => {
        document.title = "Rooms";
    }, []);

    useEffect(() => {
        socket.emit("GetRooms");
        socket.on("roomsReceived", (r) => {
            setRooms(r);
        });
        return () => {
            socket.off("roomsReceived");
        };
    }, [socket]);
    const handleRoom = (id) => {
        userProps.current = { ...userProps.current, type: "play", id };
        nav("/game");
    };
    const handleView = (id) => {
        userProps.current = { ...userProps.current, type: "view", id };
        nav("/game");
    };
    const handleRename = () => {
        nav("/Rename");
    };
    const handleLogout = () => {
        nav("/login");
        userProps.current = {};
        socket.disconnect();
    };
    return (
        <>
            <div className="RoomContainer">
                <div className="menu">
                    <div className="playername">
                        Player: {userProps.current.name}
                    </div>
                    <button className="custom" onClick={() => setCostom(true)}>
                        Custom Room
                    </button>
                    <button className="rename" onClick={handleRename}>
                        Rename
                    </button>
                    <button className="logout" onClick={handleLogout}>
                        Log Out
                    </button>
                </div>
                {rooms.map((room) => {
                    return (
                        <div
                            className="rooms"
                            id={`room${room.id}`}
                            key={room.id}
                        >
                            {room.name}
                            <br />
                            Current Player: {room.Player.length}
                            <br />
                            Current Viewer: {room.Viewer.length}
                            <br />
                            <button
                                className="playbtn"
                                disabled={room.Player.length === 2}
                                onClick={() => {
                                    handleRoom(room.id);
                                }}
                            >
                                Play
                            </button>
                            <button
                                onClick={() => {
                                    handleView(room.id);
                                }}
                                className="viewbtn"
                            >
                                View
                            </button>
                        </div>
                    );
                })}
            </div>
            {costom && <Costom setCostom={setCostom} />}
        </>
    );
};
export default Rooms;
