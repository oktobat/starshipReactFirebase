import { configureStore } from '@reduxjs/toolkit';
import productReducer from './product'
import memberReducer from './member'

const store = configureStore({
    reducer : {
        products : productReducer,
        members : memberReducer
    }
})

export default store; 