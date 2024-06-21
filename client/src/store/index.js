import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import doctorReducer from "./doctorSlice"
import slotReducer from "./slotSlice"

const store = configureStore({
    reducer:{
        user:userReducer,
        doctor:doctorReducer,
        slot:slotReducer,

    }
})

export default store;