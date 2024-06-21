import { createSlice } from "@reduxjs/toolkit";


const slotSlice = createSlice({
    name: "slot",
    initialState: {
        data:null,
    },
    reducers:{
        setAppointmentData(state, action) {
          
            state.data = action.payload;
          },
          deleteAppointmentData(state) {
            state.data = null;
          }
    }

})

export const { setAppointmentData, deleteAppointmentData } = slotSlice.actions;
export default slotSlice.reducer;