import { createSlice } from '@reduxjs/toolkit';

let nextTrackId = 0;

const trackSlice = createSlice({
  name: 'tracks',
  initialState: {
    items: {},
    ids: [],
    numSteps: 16,
    curSelectedStep: {
      trackId: -1,
      step: -1
    },
    eventEditorForm: {
      type: '',
      note: '',
      vel: '',
      dur: ''
    }
  },
  reducers: {
    addTrack: {
      reducer(state, action) {
        const newTrack = createTrack(action.payload, state.numSteps);
        state.items[newTrack.id] = newTrack;
        state.ids.push(newTrack.id);
      },
      prepare(data) {
        let res = { payload: { ...data, id: nextTrackId++ } }
        return res
      }
    },
    updateEvent(state, action) {
      const payload = action.payload;
      const track = state.items[payload.id];
      if (track) {
        track.events[payload.event].note = payload.note;
        track.events[payload.event].vel = payload.vel;
        track.events[payload.event].dur = payload.dur;
      }
    },
    selectStep(state, action) {
      // update curSelectedStep
      state.curSelectedStep.trackId = action.payload.trackId;
      state.curSelectedStep.step = action.payload.step;
      
      // update eventEditorForm
      const curSelectedStep = action.payload;
      const tracks = state.items;
      let curEvent = { note: '', vel: '', dur: '' };

      const track = tracks[curSelectedStep.trackId];
      if (track) {
        const event = track.events[curSelectedStep.step];
        if (event.type === 'rest') {
          curEvent.type = 'rest';
        } else {
          curEvent = event;
        }
      }

      state.eventEditorForm.type = curEvent.type;
      state.eventEditorForm.note = curEvent.note;
      state.eventEditorForm.vel = curEvent.vel;
      state.eventEditorForm.dur = curEvent.dur;
    },
    deleteTrackById(state, action) {
      const id = action.payload.id;
      if (state.items[id]) {
        delete state.items[id];
        state.ids = state.ids.filter((elt) => elt !== id);
      }
    },
    deleteTrackByName(state, action) {
      const name = action.payload.name;
      let toDeleteId = null;
      for (const id of state.ids) {
        const item = state.items[id];
        if (item.name === name) {
          toDeleteId = item.id;
          break;
        }
      }
      if (state.items[toDeleteId]) {
        delete state.items[toDeleteId];
        state.ids = state.ids.filter((elt) => elt !== toDeleteId);
      }
    }
  }
})

function createTrack(payload, numSteps) {
  let track = {
    id: payload.id,
    name: payload.name,
    events: []
  };
  for (let i = 0; i < numSteps; i++) {
    track.events.push({ type: 'rest' });
  }
  return track;
}

export const { addTrack, updateEvent, selectStep, deleteTrackById, deleteTrackByName } = trackSlice.actions

export default trackSlice.reducer
