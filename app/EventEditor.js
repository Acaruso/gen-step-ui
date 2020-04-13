import React, { useState } from 'react';
import { createSelector } from '@reduxjs/toolkit'
import { connect } from 'react-redux'
import { updateEvent } from './redux/slices/trackSlice';

function EventEditor({curEvent, curSelectedStep, updateEvent}) {
  const [note, setNote] = useState('');
  const [vel, setVel] = useState('');
  const [dur, setDur] = useState('');

  function onClickAddEvent() {
    updateEvent({
      id: curSelectedStep.trackId,
      event: curSelectedStep.step,
      note: note,
      vel: vel, 
      dur: dur
    });
  }

  return (
    <div>
      <h3>Event Editor</h3>
      <div className="event-editor-row">
        <label htmlFor="note">note</label>
        <input 
          type="text" 
          id="note" 
          className="event-editor-input"
          value={note}
          onChange={e => setNote(e.target.value)}
        />
        <span>cur note: {curEvent.note}</span>
      </div>
      <div className="event-editor-row">
        <label htmlFor="note">vel</label>
        <input 
          type="text" 
          id="vel" 
          className="event-editor-input"
          value={vel}
          onChange={e => setVel(e.target.value)}
        />
        <span>cur vel: {curEvent.vel}</span>
      </div>
      <div className="event-editor-row">
        <label htmlFor="note">dur</label>
        <input 
          type="text" 
          id="dur" 
          className="event-editor-input"
          value={dur}
          onChange={e => setDur(e.target.value)}
        />
        <span>cur dur: {curEvent.dur}</span>
      </div>
      <div className="event-editor-row">
        <button onClick={onClickAddEvent}>Add Event</button>
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
    curEvent: selectCurEvent(state),
    curSelectedStep: state.curSelectedStep
  };
}

const mapDispatchToProps = { updateEvent };

export default connect(mapStateToProps, mapDispatchToProps)(EventEditor);
