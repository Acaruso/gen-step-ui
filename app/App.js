import React from "react";
import { remote, ipcRenderer } from "electron";

const mainProcess = remote.require("./main.js");

export default function App() {
    ipcRenderer.on('file-opened', (event, file, content) => {
        console.log('ipcRenderer!!!!!!!!!!!!!!')
        console.log(file)
        console.log(content)
    });

    const handleClick = () => {
        // mainProcess.getFile();
        mainProcess.writeMidiFile();
    };

    return (
        <div onClick={handleClick}>Open File</div>
    );
}
