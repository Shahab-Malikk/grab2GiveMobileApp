import { configureStore } from "@reduxjs/toolkit";
import onBoardingFormReducer from "./slices/OnBoardingFormSlice";

const store = configureStore({
  reducer: {
    onBoardingForm: onBoardingFormReducer,
  },
});

export default store;
