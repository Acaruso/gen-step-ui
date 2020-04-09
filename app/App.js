import React, { useState } from 'react';
import Song from "./Song";

export default function App() {
  return (
    <>
      <div>
        <button>Load Song</button>
        <button>Save Song</button>
      </div>
      <Song />
    </>
  );
}
