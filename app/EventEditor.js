import React, { useState } from 'react';
import { createSelector } from '@reduxjs/toolkit'
import { connect } from 'react-redux'

function EventEditor({curEvent}) {
  return (
    <div>
      <h3>Event Editor</h3>
      <div className="event-editor-row">
        <label htmlFor="note">note</label>
        <input 
          type="text" 
          id="note" 
          className="event-editor-input"
          value={curEvent.note}
        />
      </div>
      <div className="event-editor-row">
        <label htmlFor="note">vel</label>
        <input type="text" id="vel" className="event-editor-input"></input>
      </div>
      <div className="event-editor-row">
        <label htmlFor="note">dur</label>
        <input type="text" id="dur" className="event-editor-input"></input>
      </div>
      <div className="event-editor-row">
        <button>Add Event</button>
        <button>Delete Event</button>
      </div>
    </div>
  );
}

const selectTracks = state => state.tracks.items;
const selectCurSelectedStep = state => state.curSelectedStep;

const selectCurEvent = createSelector(
  [selectTracks, selectCurSelectedStep],
  (tracks, curSelectedStep) => {
    const track = tracks[curSelectedStep.trackId];
    if (track) {
      const event = track.events[curSelectedStep.step];
      if (event) {
        return event;
      }
    }
    return {};
  }
);

function mapStateToProps(state) {
  return {
    curEvent: selectCurEvent(state)
  };
}

export default connect(mapStateToProps)(EventEditor);
