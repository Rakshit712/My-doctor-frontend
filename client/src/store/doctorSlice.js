import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const getSlotsForDoctor = createAsyncThunk(
    "getSlots",
    async (id) => {
       // const request  = await axios.get(`http://localhost:8000/api/slot/doctor/${id}`)
        const request = await axios.get(`https://my-doctors-app.onrender.com/api/slot/doctor/${id}`)
        const response = await request.data;
        return response;
    }
)

export const getDoctor = createAsyncThunk(
    "getDoctor",
    async (id) => {
        const request = await axios.get(`https://my-doctors-app.onrender.com/api/doctors/${id}`)
       // const request  = await axios.get(`http://localhost:8000/api/doctors/${id}`);
        const response = await request.data;
        return response;
    }
)
const doctorSlice = createSlice({
    name:"doctor",
    initialState:{
        loading:false,
        user:null,
        error:null,
        slot:null,
    },
    extraReducers:(builder) => {
        builder.addCase(getDoctor.pending,(state)=>{
            state.loading = true;
            state.user = null,
            state.error = null
        })
        .addCase(getDoctor.fulfilled,(state,action) => {
            state.user = action.payload.data;
            state.loading = false;
            state.error = null;
        })
        .addCase(getDoctor.rejected,(state,action) => {
            state.user = null;
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(getSlotsForDoctor.pending,(state)=>{
            state.loading = true;
            state.slot = null,
            state.error = null
        })
        .addCase(getSlotsForDoctor.fulfilled,(state,action)=> {
            state.slot = action.payload.data;
            state.loading = false;
            state.error = null;
        })
        .addCase(getSlotsForDoctor.rejected,(state,action)=>{
            state.slot = null;
            state.loading = false;
            if(action.error.message == "Request failed with status code 400"){
                state.error = "No slots available for this doctor"
            };

        })
    }
})

export default doctorSlice.reducer;