import { createSlice } from '@reduxjs/toolkit';
import { selectStep } from "./curSelectedStepSlice";

const eventEditorFormSlice = createSlice({
  name: 'eventEditorForm',
  initialState: {
    note: '',
    vel: '',
    dur: ''
  },
  reducers: {
    updateEventEditorForm(state, action) {
      state.note = action.payload.note;
      state.vel = action.payload.vel;
      state.dur = action.payload.dur;
    },
  },
  extraReducers: {
    [selectStep]: (state, action) => {
      // when user selects new step, update event editor form
      const curSelectedStep = action.payload;
      let curEvent = { note: '', vel: '', dur: '' };

      const track = tracks[curSelectedStep.trackId];
      if (track) {
        const event = track.events[curSelectedStep.step];
        if (event) {
          curEvent = event;
        }
      }

      state.note = curEvent.note;
      state.vel = curEvent.vel;
      state.dur = curEvent.dur;
    }
  }
})

export const { updateEventEditorForm } = eventEditorFormSlice.actions

export default eventEditorFormSlice.reducer
