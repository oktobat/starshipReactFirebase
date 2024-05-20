import firebase from 'firebase/compat/app'
import 'firebase/compat/database';
import 'firebase/compat/storage';

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyBErHWR3xI0igta2laDyKKwIitHUu75L5c",
    authDomain: "kim-project-81d2d.firebaseapp.com",
    databaseURL: "https://kim-project-81d2d-default-rtdb.firebaseio.com",
    projectId: "kim-project-81d2d",
    storageBucket: "kim-project-81d2d.appspot.com",
    messagingSenderId: "589809226853",
    appId: "1:589809226853:web:bf1c0a025356bf05b6e28c"
  });

const oDB = firebaseConfig.database()
export const productDB = oDB.ref('products')
export const cartDB = oDB.ref('carts')
export const orderDB = oDB.ref('orders')
export const memberDB = oDB.ref('members')
export const noticeDB = oDB.ref('notice')
export const reviewDB = oDB.ref('review')

export const oStorage = firebaseConfig.storage();