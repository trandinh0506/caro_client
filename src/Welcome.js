import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";
import close from "./close.png";
const Welcome = () => {
    const [showInfo, setShowInfo] = useState(true);
    const nav = useNavigate();
    return (
        <div className="container">
            <div className="LoginForm">
                <button
                    onClick={() => {
                        nav("/login");
                    }}
                >
                    Login
                </button>
                <button
                    onClick={() => {
                        nav("/sign-up");
                    }}
                >
                    Sign up
                </button>
            </div>
            {showInfo && (
                <div className="info">
                    <div className="closeInfo">
                        <img
                            onClick={() => setShowInfo(false)}
                            src={close}
                            alt=""
                        />
                    </div>
                    <h1>Một số lưu ý:</h1>
                    <span>
                        Trang web này hiện tại vẫn đang trong giai đoạn phát
                        triển
                    </span>
                    <span>
                        Không thể tránh khỏi những lỗi có thể xẩy ra trong quá
                        trình sử dụng
                    </span>
                    <span>
                        Mọi ý kiến, đóng góp vui lòng liên hệ:{" "}
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://facebook.com/trandinh0506"
                        >
                            Facebook
                        </a>
                    </span>
                </div>
            )}
        </div>
    );
};
export default Welcome;
