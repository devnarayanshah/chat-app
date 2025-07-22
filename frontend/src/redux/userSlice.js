import { createSlice } from "@reduxjs/toolkit"


const userSlice = createSlice({
    name: "user",
    initialState: {
        authUser: null,
        otherUsers: null,
        selectedUser: null,
        onlineUSer:null,
    },
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload
        },
        setOtherUSers: (state, action) => {
            state.otherUsers = action.payload;
        },
        setSelectedUSer:(state,action)=>{
            state.selectedUser=action.payload
        },
        setOnlineUser: (state, action) => {
            state.onlineUSer = action.payload
        }

    }
})
export const { setAuthUser, setOtherUSers, setSelectedUSer,setOnlineUser} = userSlice.actions;
export default userSlice.reducer;