import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stepCount: 0,
  formProgress: 0,
};

export const onBoardingFormSlice = createSlice({
  name: "onBoardingForm",
  initialState,
  reducers: {
    nextStep: (state) => {
      if (state.stepCount < 4) {
        state.stepCount += 1;
      } else {
        state.stepCount = 0;
      }
    },
    prevStep: (state) => {
      if (state.stepCount > 0) {
        state.stepCount -= 1;
      }
    },
    incrementFormProgress: (state) => {
      if (state.formProgress < 100) {
        state.formProgress += 25;
      }
    },
    decrementFormProgress: (state) => {
      if (state.formProgress > 0) {
        state.formProgress -= 25;
      }
    },
  },
});

export const {
  nextStep,
  prevStep,
  incrementFormProgress,
  decrementFormProgress,
} = onBoardingFormSlice.actions;
export default onBoardingFormSlice.reducer;
