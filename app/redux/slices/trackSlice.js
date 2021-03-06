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
    transport: -1,
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
        track.events[payload.event].type = payload.type;
        track.events[payload.event].active = payload.active;
        track.events[payload.event].note = payload.note;
        track.events[payload.event].vel = payload.vel;
        track.events[payload.event].dur = payload.dur;
      }
    },
    selectStep(state, action) {
      state.curSelectedStep.trackId = action.payload.trackId;
      state.curSelectedStep.step = action.payload.step;
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
    },
    incrementTransport(state, action) {
      state.transport = (state.transport + 1) % 16;
    },
    triggerEvent(state, action) {
      // do nothing, action is handled in middleware
    },
    loadSample(state, action) {
      const { trackId, filePath } = action.payload;
      const track = state.items[trackId];
      const splits = filePath.split('\\');
      const sampleName = splits[splits.length - 1]
      track.sampleName = sampleName ? sampleName : 'No sample loaded'
    }
  }
})

function createTrack(payload, numSteps) {
  let track = {
    id: payload.id,
    name: payload.name,
    events: [],
    sampleName: '',
  };
  for (let i = 0; i < numSteps; i++) {
    track.events.push({ type: 'rest', active: false });
  }
  return track;
}

export const {
  addTrack,
  updateEvent,
  selectStep,
  deleteTrackById,
  deleteTrackByName,
  incrementTransport,
  triggerEvent,
  loadSample,
} = trackSlice.actions

export default trackSlice.reducer
