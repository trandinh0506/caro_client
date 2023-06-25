import React, { useState, useEffect, useContext, useRef } from "react";
import Context from "./Context";
const GameHeader = ({ room, start }) => {
    const [userProps, socket] = useContext(Context);
    const { name, type, id } = userProps.current;
    const [player1Time, setPlayer1Time] = useState(180);
    const [player2Time, setPlayer2Time] = useState(180);
    const timerId = useRef();
    useEffect(() => {
        socket.emit("getTime", id);
        if (start) {
            timerId.current = setInterval(() => {
                socket.emit("updateTime", id);
            }, 250);
        }
        socket.on("timeReceived", ({ time, turn }) => {
            if (turn === "X") setPlayer1Time(time);
            else setPlayer2Time(time);
        });
        if (type === "view") socket.emit("getTimeForViewer", id);
        socket.on("viewerRecievedTime", (time) => {
            setPlayer1Time(time[0]);
            setPlayer2Time(time[1]);
        });
        socket.on("resetTimer", () => {
            clearInterval(timerId.current);
        });
        socket.on("win", () => {
            clearInterval(timerId.current);
            setPlayer1Time(180);
            setPlayer2Time(180);
        });
        return () => clearInterval(timerId.current);
    }, [socket, id, start, type]);
    return (
        <div>
            <div
                className={
                    type === "view"
                        ? "player1"
                        : name === room.Player[0]
                        ? "player1"
                        : "player2"
                }
            >
                {type === "view"
                    ? room.Player[0]
                    : name === room.Player[0]
                    ? room.Player[0]
                    : room.Player[1]}
                <span
                    className={
                        type === "view"
                            ? "player1Time"
                            : name === room.Player[0]
                            ? "player1Time"
                            : "player2Time"
                    }
                >
                    {type === "view"
                        ? Math.floor(player1Time)
                        : name === room.Player[0]
                        ? Math.floor(player1Time)
                        : Math.floor(player2Time)}
                </span>
            </div>
            <div
                className={
                    type === "view"
                        ? "player2"
                        : name === room.Player[1]
                        ? "player1"
                        : "player2"
                }
            >
                {type === "view"
                    ? room.Player[1]
                    : name === room.Player[1]
                    ? room.Player[0]
                    : room.Player[1] || "..."}
                <span
                    className={
                        type === "view"
                            ? "player2Time"
                            : name === room.Player[1]
                            ? "player1Time"
                            : "player2Time"
                    }
                >
                    {type === "view"
                        ? Math.floor(player2Time)
                        : name === room.Player[1]
                        ? Math.floor(player1Time)
                        : Math.floor(player2Time)}
                </span>
            </div>
        </div>
    );
};
export default GameHeader;
