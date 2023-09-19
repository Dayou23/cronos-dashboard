import { createSlice } from "@reduxjs/toolkit";

export const sliderSlice = createSlice({
  name: "slider",
  initialState: {
    sliders: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getSliderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getSliderSuccess: (state, action) => {
      state.isFetching = false;
      state.sliders = action.payload;
    },
    getSliderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteSliderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteSliderSuccess: (state, action) => {
      state.isFetching = false;
      state.sliders.splice(
        state.sliders.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteSliderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateSliderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateSliderSuccess: (state, action) => {
      state.isFetching = false;
      state.sliders[
        state.sliders.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.slider;
    },
    updateSliderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //add
    addSliderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addSliderSuccess: (state, action) => {
      state.isFetching = false;
      state.sliders.push(action.payload);
    },
    addSliderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logoutSlider: (state) => {
      state.sliders = null;
      state.error = false;
    },
  },
});

export const {
  getSliderStart,
  getSliderSuccess,
  getSliderFailure,
  deleteSliderStart,
  deleteSliderSuccess,
  deleteSliderFailure,
  updateSliderStart,
  updateSliderSuccess,
  updateSliderFailure,
  addSliderStart,
  addSliderSuccess,
  addSliderFailure,
  logoutSlider,
} = sliderSlice.actions;

export default sliderSlice.reducer;
