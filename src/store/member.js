import { createSlice } from '@reduxjs/toolkit';
import { memberDB } from '@/assets/firebase'

const memberSlice = createSlice({
    name:"member",
    initialState : {
        members : [],  // [{key, userId, userPw, userIrum, 주소, ... }, {key, userId, userPw }, ...]
        user : null,    // {key, userId, userPw, 모든 정보}
    },
    reducers : {
        initMembers(state, action){
            state.members = action.payload
        },
        userLogin(state, action){
            state.user = action.payload
            localStorage.loging = JSON.stringify(action.payload) 
        },
        localUser(state, action){
            state.user = action.payload
        },
        userLogout(state, action){
            state.user = null
            localStorage.clear()
        }
    }
})

export const { initMembers, userLogin, userLogout, localUser } = memberSlice.actions;
export const fetchMembers = ()=> async dispatch => {
    try {
      memberDB.on('value', (snapshot)=>{
        const membersObj = snapshot.val()
        const membersArr = Object.entries(membersObj).map(([key, value]) => {
            return { key:key, ...value }; // 키와 값 모두 포함한 객체 생성
        });
        dispatch(initMembers(membersArr))
      })
    } catch (error) {
        console.error('오류:', error);
    }
}

export default memberSlice.reducer;