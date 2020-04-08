import React, { useState } from 'react';
import Track from "./Track";

export default function Song({song}) {
  const [numTracks, setNumTracks] = useState(0);

  return (
    <>
      <Track />
    </>
  );
}
