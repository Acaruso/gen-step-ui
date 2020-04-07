import React from "react";
import constants from "./constants";
import { writeSong } from "./midi";

export default function App() {
  const handleClick = () => {
    writeSong('test1.mid', constants.testSong);
  };

  return (
    <div onClick={handleClick}>Open File</div>
  );
}
