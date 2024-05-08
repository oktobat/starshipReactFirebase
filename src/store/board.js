import { createSlice } from '@reduxjs/toolkit';
import { noticeDB, reviewDB } from '@/assets/firebase'


const boardSlice = createSlice({
    name:"boards",
    initialState : {
        notice : [],  
        review : [],
        type : "notice",
        list : []  
    },
    reducers : {
        initNotice(state, action){
            state.notice = action.payload
            state.list = action.payload.sort((a, b)=>a.key>b.key ? -1 : 1);
        },
        initReview(state, action){
            state.review = action.payload.sort((a, b)=>a.key>b.key ? -1 : 1);
        },
        changeType(state, action){
            state.type = action.payload
            if (state.type=="notice") {
                state.list = state.notice.sort((a, b)=>a.key>b.key ? -1 : 1);
            } else if (state.type=="review") {
                state.list = state.review.sort((a, b)=>a.key>b.key ? -1 : 1);
            }
        }
    }
})

export const { initNotice, initReview, changeType } = boardSlice.actions;

export const fetchNotice = ()=> async dispatch => {
    try {
      noticeDB.on('value', (snapshot)=>{
        const noticeObj = snapshot.val()
            console.log("파이어객체", noticeObj)
        const noticeArr = Object.entries(noticeObj).map(([key, value]) => {
            return { key:key, ...value }; // 키와 값 모두 포함한 객체 생성
        });
            console.log("파이어배열", noticeArr)
        dispatch(initNotice(noticeArr))
      })
    } catch (error) {
        console.error('Error fetching notice:', error);
    }
}

export const fetchReview = ()=> async dispatch => {
    try {
      reviewDB.on('value', (snapshot)=>{
        const reviewObj = snapshot.val()
            console.log("파이어객체", reviewObj)
        const reviewArr = Object.entries(reviewObj).map(([key, value]) => {
            return { key:key, ...value }; // 키와 값 모두 포함한 객체 생성
        });
            console.log("파이어배열", reviewArr)
        dispatch(initReview(reviewArr))
      })
    } catch (error) {
        console.error('Error fetching review:', error);
    }
}

export default boardSlice.reducer;