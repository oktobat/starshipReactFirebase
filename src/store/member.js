import { createSlice } from '@reduxjs/toolkit';
import { memberDB } from '@/assets/firebase'

const memberSlice = createSlice({
    name:"member",
    initialState : {
        members : [],  // [{ userId, userPw }, ...]
        user : null,    // { }
        admin : false
    },
    reducers : {
        initMembers(state, action){
            state.members = action.payload
        },
        userLogin(state, action){
            state.user = action.payload
            // localStorage.setItem('loging', JSON.stringify(action.payload))
            localStorage.loging = JSON.stringify(action.payload) 
            if (action.payload.userId=='tsalt@hanmail.net') {
                localStorage.admin = JSON.stringify(true)
                state.admin = true
            } else {
                localStorage.admin = JSON.stringify(false)
                state.admin = false
            }
        },
        userLogout(state, action){
            state.user = action.payload
            state.admin = false
            localStorage.clear()
        }
    }
})

export const { initMembers, userLogin, userLogout } = memberSlice.actions;
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