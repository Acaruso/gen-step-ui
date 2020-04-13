import React, { useState } from 'react';

function EventEditor() {
  return (
    <div>
      <h3>Event Editor</h3>
      <div>
        <label for="note">note</label>
        <input type="text" id="note" className="event-editor-input"></input>
      </div>
      <div>
        <label for="note">vel</label>
        <input type="text" id="vel" className="event-editor-input"></input>
      </div>
      <div>
        <label for="note">dur</label>
        <input type="text" id="dur" className="event-editor-input"></input>
      </div>
      <div>
        <button>Add Event</button>
        <button>Delete Event</button>
      </div>
    </div>
  );
}

export default EventEditor;