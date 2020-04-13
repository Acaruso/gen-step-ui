import { createSlice } from '@reduxjs/toolkit';

let nextTrackId = 0;

const trackSlice = createSlice({
  name: 'tracks',
  initialState: {
    items: {},
    ids: [],
    numSteps: 16,
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
    track.events.push({});
  }
  return track;
}

export const { addTrack, deleteTrackById, deleteTrackByName } = trackSlice.actions

export default trackSlice.reducer
