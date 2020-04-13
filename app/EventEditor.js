import React, { useState } from 'react';
import { createSelector } from '@reduxjs/toolkit'
import { connect } from 'react-redux'
import { updateEvent } from './redux/slices/trackSlice';

function EventEditor({curEvent, curSelectedStep, updateEvent}) {
  function onChangeNote(e) {
    const newNote = e.target.value.replace(/\D/,'');
    _updateEvent({
      ...curEvent,
      note: newNote,
    });
  }

  function onChangeVel(e) {
    const newVel = e.target.value.replace(/\D/,'');
    _updateEvent({
      ...curEvent,
      vel: newVel,
    });
  }

  function onChangeDur(e) {
    const newDur = e.target.value.replace(/\D/,'');
    _updateEvent({
      ...curEvent,
      dur: newDur,
    });
  }

  function _updateEvent(event) {
    updateEvent({
      id: curSelectedStep.trackId,
      event: curSelectedStep.step,
      note: event.note,
      vel: event.vel, 
      dur: event.dur
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
          value={curEvent.note}
          onChange={onChangeNote}
        />
        <span>cur note: {curEvent.note}</span>
      </div>
      <div className="event-editor-row">
        <label htmlFor="note">vel</label>
        <input 
          type="text" 
          id="vel" 
          className="event-editor-input"
          value={curEvent.vel}
          onChange={onChangeVel}
        />
        <span>cur vel: {curEvent.vel}</span>
      </div>
      <div className="event-editor-row">
        <label htmlFor="note">dur</label>
        <input 
          type="text" 
          id="dur" 
          className="event-editor-input"
          value={curEvent.dur}
          onChange={onChangeDur}
        />
        <span>cur dur: {curEvent.dur}</span>
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
    return { note: '', vel: '', dur: '' };
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
