import Context from "./Context";

import React, { useRef, useState, useEffect } from "react";
const Provider = ({ children }) => {
    const userProps = useRef({});
    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.setItem(
                "userProps",
                JSON.stringify(userProps.current)
            );
        };
        window.addEventListener("beforeunload", handleBeforeUnload);

        userProps.current = JSON.parse(localStorage.getItem("userProps"));
        localStorage.removeItem("userProps");
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);
    const [socket, setSocket] = useState();
    return (
        <Context.Provider value={[userProps, socket, setSocket]}>
            {children}
        </Context.Provider>
    );
};
export default Provider;
