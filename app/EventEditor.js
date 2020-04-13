import React, { useState } from 'react';

function EventEditor() {
  return (
    <div>
      <h3>Event Editor</h3>
      <div className="event-editor-row">
        <label for="note">note</label>
        <input type="text" id="note" className="event-editor-input"></input>
      </div>
      <div className="event-editor-row">
        <label for="note">vel</label>
        <input type="text" id="vel" className="event-editor-input"></input>
      </div>
      <div className="event-editor-row">
        <label for="note">dur</label>
        <input type="text" id="dur" className="event-editor-input"></input>
      </div>
      <div className="event-editor-row">
        <button>Add Event</button>
        <button>Delete Event</button>
      </div>
    </div>
  );
}

export default EventEditor;