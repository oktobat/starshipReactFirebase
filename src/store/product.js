import { createSlice } from '@reduxjs/toolkit';
import { productDB, cartDB } from '@/assets/firebase'

const productSlice = createSlice({
    name:"products",
    initialState : {
        products : [],   // { "key":"", "category":"woman", "id":1001, "title":"여성의류1", "price":437500, "rating":5, "description":"여성의류1 요약설명은 <strong>중요</strong>합니다.", "inventory":10, "image":"./assets/image/0010050001972.jpg" },
        carts: [],       //  firebase : {key:key, userId:userId, id:id, qty:3 }
        cartsCount : 0
    },
    reducers : {
        initProducts(state, action){
            state.products = action.payload
        },
        initCarts(state, action){
            state.carts = action.payload
            state.cartsCount = state.carts.length
        },
    }
})

export const { initProducts, initCarts } = productSlice.actions;

export const fetchProducts = ()=> async dispatch => {
    try {
      productDB.on('value', (snapshot)=>{
        const productsObj = snapshot.val()
        const productsArr = Object.entries(productsObj).map(([key, value]) => {
            return { key:key, ...value }; // 키와 값 모두 포함한 객체 생성
        });
        dispatch(initProducts(productsArr))
      })
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

export const fetchCarts = ()=> async (dispatch, getState) => {
    const user = getState().members.user
    if (user) {
        try {
            const snapshot = await cartDB.once('value');
            if (snapshot.val()) {
                const cartsObj = snapshot.val();
                if (cartsObj) {
                    const cartsArr = Object.entries(cartsObj).map(([key, value]) => {
                        return { key:key, ...value }; // 키와 값 모두 포함한 객체 생성
                    });
                    const userCarts = cartsArr.find(item=>item.key==user.key )
                    if (userCarts) {
                        const userCartsArr = Object.entries(userCarts).map(([key, value]) => {
                            return { key:key, ...value }
                        })
                        const userCartsArrNotFirst = userCartsArr.filter((item, key)=>key!==0)
                        dispatch(initCarts(userCartsArrNotFirst));        
                    } else {
                        dispatch(initCarts([]));    
                    }
                } else {
                    dispatch(initCarts([]));        
                }
            } else {
                dispatch(initCarts([]));  
            }
        } catch (error) {
            console.error('Error fetching carts:', error);
        }
    } else {
        dispatch(initCarts([]));  
    }
}


export default productSlice.reducer;