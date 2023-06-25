import Context from "./Context";

import React, { useRef, useState } from "react";
const Provider = ({ children }) => {
    // useEffect(() => {
    //     const handleBeforeUnload = (event) => {
    //         event.preventDefault();
    //         event.returnValue = "";
    //     };
    //     window.addEventListener("beforeunload", handleBeforeUnload);

    //     return () => {
    //         window.removeEventListener("beforeunload", handleBeforeUnload);
    //     };
    // }, []);
    const [socket, setSocket] = useState();
    const userProps = useRef({});
    return (
        <Context.Provider value={[userProps, socket, setSocket]}>
            {children}
        </Context.Provider>
    );
};
export default Provider;
