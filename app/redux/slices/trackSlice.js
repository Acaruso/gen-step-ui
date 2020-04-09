import { createSlice } from '@reduxjs/toolkit';

let nextTrackId = 0;

const trackSlice = createSlice({
  name: 'tracks',
  initialState: {},
  reducers: {
    addTrack: {
      reducer(state, action) {
        const newTrack = action.payload;
        state[newTrack.id] = newTrack;
      },
      prepare(data) {
        let res = { payload: { ...data, id: nextTrackId++ } }
        return res
      }
    }
  }
})

export const { addTrack } = trackSlice.actions

export default trackSlice.reducer
