import React from "react";
import { remote } from "electron";
const mainProcess = remote.require("./index.js");

export default function App() {
    const handleClick = () => {
        mainProcess.getFile();
    };

    return (
        <div onClick={handleClick}>click me</div>
    );
}
