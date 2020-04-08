import React from "react";
import constants from "./constants";
import { writeSong } from "./midi";

export default function App() {
  const handleClick = () => {
    writeSong('test1.mid', constants.testSong);
  };

  return (
    <>
      <div onClick={handleClick}>Open File</div>
      {/* <div className="container" style={{display: "flex"}}> */}
      <div className="container">
        <span className="item"></span>
        <span className="item"></span>
        <span className="item"></span>
        <span className="item"></span>
      </div>
    </>
  );
}
