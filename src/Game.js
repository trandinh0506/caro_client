import React, { useEffect, useState, useContext } from "react";
import "./Game.css";
import Context from "./Context";
import ChatBox from "./ChatBox";
import GameHeader from "./GameHeader";
import { useNavigate } from "react-router-dom";
const Game = () => {
    const [GameBoard, setGameBoard] = useState({ GB: [] });
    const [room, setRoom] = useState({ Player: [] });
    const [show, setShow] = useState(false);
    const [start, setStart] = useState(false);
    const [showStart, setShowStart] = useState(true);
    const [winner, setWinner] = useState(null);
    const [userProps, socket] = useContext(Context);
    const { name, id, type } = userProps.current;
    const nav = useNavigate();
    useEffect(() => {
        document.title = "Caro Game";
        if (!userProps.current) nav("/login");
    }, [userProps, nav]);

    useEffect(() => {
        socket.emit("subscribe", {
            id,
            type,
            name,
        });

        socket.emit("GetGameBoard", id);
        socket.on("DataReceived", (GB) => {
            setGameBoard(GB);
        });

        socket.emit("getDataRoom", id);
        socket.on("DataRoom", (r) => {
            setRoom(r);
        });

        socket.on("accept?", () => {
            setShow(true);
        });

        socket.on("started", () => {
            setStart(true);
        });

        socket.on("win", (turn) => {
            setWinner(turn);
        });

        return () => {
            socket.emit("unsubscribe", {
                id,
                type,
                name,
            });
        };
    }, [socket, id, name, type]);

    const handleGame = (row, col) => {
        if (start && type === "play") {
            if (
                (name === room.Player[0] && GameBoard.turn === "X") ||
                (name === room.Player[1] && GameBoard.turn === "O")
            ) {
                socket.emit("move", { id, row, col, name });
            }
        }
    };

    const handleStart = () => {
        socket.emit("start?", id);
        setShowStart(false);
    };

    const handleAccept = () => {
        setShow(false);
        socket.emit("accepted", id);
    };
    const handleRestart = () => {
        setStart(false);
        if (name === room.Player[0]) {
            setShowStart(true);
        }
        setWinner(null);
    };
    return (
        <>
            <button
                className="back"
                onClick={() => {
                    nav("/rooms");
                }}
            >
                Back
            </button>
            <div className="GameWapper">
                <GameHeader room={room} start={start} />
                <div className="game-board">
                    {GameBoard.GB.map((row, rowIndex) => (
                        <div className="row" key={rowIndex}>
                            {row.map((cell, columnIndex) => (
                                <div
                                    className="cell"
                                    key={columnIndex}
                                    onClick={() =>
                                        handleGame(rowIndex, columnIndex)
                                    }
                                >
                                    {cell}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <ChatBox />
            {
                <div>
                    {name === room.Player[0] && showStart && (
                        <button
                            disabled={room.Player.length < 2}
                            onClick={handleStart}
                            className="start_game_btn"
                        >
                            Start Game
                        </button>
                    )}
                    {show && name === room.Player[1] && (
                        <button onClick={handleAccept} className="accept_btn">
                            Accept
                        </button>
                    )}
                </div>
            }
            {winner && type === "play" && (
                <div className="win-banner">
                    <button onClick={() => nav("/rooms")} className="back_btn">
                        Back
                    </button>
                    <h1>
                        {(name === room.Player[0] ? "X" : "O") === winner
                            ? "Victory!"
                            : "Defeated!"}
                    </h1>
                    <button className="restart_btn" onClick={handleRestart}>
                        Play Again
                    </button>
                </div>
            )}
        </>
    );
};

export default Game;
