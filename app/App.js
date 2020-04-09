import React, { useState } from 'react';
import Song from "./Song";

function App() {
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

export default App;
