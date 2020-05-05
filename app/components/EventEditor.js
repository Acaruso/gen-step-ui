import React, { useState } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { updateEvent, addToProbMatrix } from "../redux/slices/trackSlice";
import { createEvent } from "../util/utils";

function EventEditor({ curEvent, curSelectedStep, updateEvent, probMatrix, addToProbMatrix }) {
  function onClickCreateEvent(e) {
    const event = createEvent("note");
    updateEvent({
      id: curSelectedStep.trackId,
      eventIdx: curSelectedStep.step,
      event: event,
    });
  }

  function onClickDeleteEvent(e) {
    const event = createEvent("rest");
    updateEvent({
      id: curSelectedStep.trackId,
      eventIdx: curSelectedStep.step,
      event: event,
    });
  }

  function onChangeNote(e) {
    const newNote = e.target.value;
    updateEvent({
      id: curSelectedStep.trackId,
      eventIdx: curSelectedStep.step,
      event: {
        ...curEvent,
        note: newNote
      },
    });
  }

  function onChangeVel(e) {
    const newVel = e.target.value.replace(/\D/, "");
    updateEvent({
      id: curSelectedStep.trackId,
      eventIdx: curSelectedStep.step,
      event: {
        ...curEvent,
        vel: newVel,
      },
    });
  }

  function onChangeDur(e) {
    const newDur = e.target.value.replace(/\D/, "");
    updateEvent({
      id: curSelectedStep.trackId,
      eventIdx: curSelectedStep.step,
      event: {
        ...curEvent,
        dur: newDur,
      },
    });
  }

  function onClickAddToProbMatrix(e) {
    addToProbMatrix({
      trackId: curSelectedStep.trackId,
      eventIdx: curSelectedStep.step,
    });
  }

  return (
    <div className="event-editor">
      <h3>Event Editor</h3>
      <EventEditorForm
        curEvent={curEvent}
        onClickCreateEvent={onClickCreateEvent}
        onClickDeleteEvent={onClickDeleteEvent}
        onChangeNote={onChangeNote}
        onChangeVel={onChangeVel}
        onChangeDur={onChangeDur}
        onClickAddToProbMatrix={onClickAddToProbMatrix}
      />
    </div>
  );
}

function EventEditorForm({
  curEvent,
  onClickCreateEvent,
  onClickDeleteEvent,
  onChangeNote,
  onChangeVel,
  onChangeDur,
  onClickAddToProbMatrix,
}) {
  if (!curEvent.active) {
    return <button onClick={onClickCreateEvent}>Create Event</button>;
  } else {
    return (
      <>
        <div className="event-editor-row">
          <label htmlFor="note">note</label>
          <input
            type="text"
            id="note"
            className="event-editor-input"
            value={curEvent.note}
            onChange={onChangeNote}
          />
        </div>
        <div className="event-editor-row">
          <label htmlFor="vel">vel</label>
          <input
            type="text"
            id="vel"
            className="event-editor-input"
            value={curEvent.vel}
            onChange={onChangeVel}
          />
        </div>
        <div className="event-editor-row">
          <label htmlFor="dur">dur</label>
          <input
            type="text"
            id="dur"
            className="event-editor-input"
            value={curEvent.dur}
            onChange={onChangeDur}
          />
        </div>
        <div>
          <button onClick={onClickAddToProbMatrix}>
            Add To Probability Matrix
          </button>
        </div>
        <div>
          <button onClick={onClickDeleteEvent}>Delete Event</button>
        </div>
      </>
    );
  }
}

const selectTracks = (state) => state.tracks.items;
const selectCurSelectedStep = (state) => state.tracks.curSelectedStep;

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
    return { note: "", vel: "", dur: "" };
  }
);

function mapStateToProps(state) {
  return {
    curEvent: selectCurEvent(state),
    curSelectedStep: state.tracks.curSelectedStep,
    probMatrix: state.tracks.probMatrix,
  };
}

const mapDispatchToProps = { updateEvent, addToProbMatrix };

export default connect(mapStateToProps, mapDispatchToProps)(EventEditor);
