import { createSlice } from '@reduxjs/toolkit';

const curSelectedStepSlice = createSlice({
  name: 'curSelectedStep',
  initialState: {
    trackId: -1,
    step: -1
  },
  reducers: {
    selectStep(state, action) {
      state.trackId = action.payload.trackId;
      state.step = action.payload.step;
    }
  }
})

export const { selectStep } = curSelectedStepSlice.actions

export default curSelectedStepSlice.reducer
