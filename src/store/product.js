import { createSlice } from '@reduxjs/toolkit';
import { productDB, cartDB } from '@/assets/firebase'

const productSlice = createSlice({
    name:"products",
    initialState : {
        products : [],  // { "category":"woman", "id":1001, "title":"여성의류1", "price":437500, "rating":5, "description":"여성의류1 요약설명은 <strong>중요</strong>합니다.", "inventory":10, "image":"./assets/image/0010050001972.jpg" },
        carts: []       // { id:id, qty:3}
    },
    reducers : {
        initProducts(state, action){
            state.products = action.payload
        },
        initCarts(state, action){
            state.carts = action.payload
        },
        addToCart(state, action){ 
            const productId = action.payload
            const existingItem = state.carts.find(item=>item.id==productId)
            if (existingItem) {
                existingItem.qty++
            } else {
                state.carts.push({ id:action.payload, qty:1})
            }
        },
        qtyUpdate(state, action){
           let {id, newQty} = action.payload
           let cartItem = state.carts.find(item=>item.id==id)
           console.log(cartItem)
           if (cartItem) {
                cartItem.qty = newQty
           }
            //  let newCart = state.carts.map(item=>item.id==id ? {...item, qty:newQty} : item )
            //  state.carts = newCart
        },
        removeCartItem(state, action){
            let id = action.payload
            state.carts = state.carts.filter(item=>item.id!==id)
        }
    }
})

export const { initProducts, initCarts, addToCart, qtyUpdate, removeCartItem } = productSlice.actions;

export const fetchProducts = ()=> async dispatch => {
    try {
      productDB.on('value', (snapshot)=>{
        const productsObj = snapshot.val()
            console.log("파이어객체", productsObj)
        const productsArr = Object.values(productsObj)
            console.log("파이어배열", productsArr)
        dispatch(initProducts(productsArr))
      })
      cartDB.on('value', (snapshot)=>{
        const cartsObj = snapshot.val()
        const cartsArr = Object.values(cartsObj)
        dispatch(initCarts(cartsArr))
      })
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

export default productSlice.reducer;