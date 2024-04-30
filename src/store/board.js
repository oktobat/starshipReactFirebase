import { createSlice } from '@reduxjs/toolkit';
import { noticeDB, reviewDB } from '@/assets/firebase'

const boardSlice = createSlice({
    name : 'boards',
    initialState : {
        notice : [],  // [ {key:'-Nvotdkdkdlf', contnet:'게시글내용', subject:'글제목', date:날짜, writer:'작성자', hit:0}]
        review : [],
        type : "notice",
        list : []
    },
    reducers : {
        initNotice(state, action){
            state.notice = action.payload
            state.list = action.payload
        },
        initReview(state, action){
            state.review = action.payload
        },
        changeType(state, action){
            state.type = action.payload
            if (state.type == "notice") {
                state.list = state.notice
            } else if (state.type == "review") {
                state.list = state.review
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
            const reviewArr = Object.entries(reviewObj).map(([key, value]) => {
                return { key:key, ...value }; // 키와 값 모두 포함한 객체 생성
            });
            dispatch(initReview(reviewArr))
        })
    } catch (error) {
        console.error('Error fetching review:', error);
    }
}

export default boardSlice.reducer;