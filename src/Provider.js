import { domain } from "./CONSTANT";
import Context from "./Context";
import React, { useRef, useState, useEffect } from "react";
const Provider = ({ children }) => {
    const userProps = useRef();
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        fetch(`${domain}wakeup`);
    }, []);
    return (
        <Context.Provider value={[userProps, socket, setSocket]}>
            {children}
        </Context.Provider>
    );
};
export default Provider;
