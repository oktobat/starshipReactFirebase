import { createSlice } from '@reduxjs/toolkit';
import { memberDB } from '@/assets/firebase'

const memberSlice = createSlice({
    name:"member",
    initialState : {
        members : [],  // { userId, userPw },
    },
    reducers : {
        initMembers(state, action){
            state.members = action.payload
        }
    }
})

export const { initMembers } = memberSlice.actions;
export const fetchMembers = ()=> async dispatch => {
    try {
      memberDB.on('value', (snapshot)=>{
        const membersObj = snapshot.val()
        const membersArr = Object.values(membersObj)
        dispatch(initMembers(membersArr))
      })
    } catch (error) {
        console.error('오류:', error);
    }
}
export default memberSlice.reducer;