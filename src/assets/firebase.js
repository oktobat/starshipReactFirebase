import firebase from 'firebase/compat/app'
import { getAuth, signInWithPopup, GithubAuthProvider } from 'firebase/auth';
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
const auth = getAuth(firebaseConfig)
const provider = new GithubAuthProvider();
export { auth, provider, signInWithPopup };


export const productDB = oDB.ref('products')
export const cartDB = oDB.ref('carts')
export const orderDB = oDB.ref('orders')
export const memberDB = oDB.ref('members')
export const noticeDB = oDB.ref('notice')
export const reviewDB = oDB.ref('review')

export const oStorage = firebaseConfig.storage();



// import { initializeApp } from 'firebase/app';
// import { getAuth, signInWithPopup, GithubAuthProvider } from 'firebase/auth';
// import { getDatabase, ref } from 'firebase/database';
// import { getStorage } from 'firebase/storage';

// const firebaseConfig = {
//     apiKey: "AIzaSyBErHWR3xI0igta2laDyKKwIitHUu75L5c",
//     authDomain: "kim-project-81d2d.firebaseapp.com",
//     databaseURL: "https://kim-project-81d2d-default-rtdb.firebaseio.com",
//     projectId: "kim-project-81d2d",
//     storageBucket: "kim-project-81d2d.appspot.com",
//     messagingSenderId: "589809226853",
//     appId: "1:589809226853:web:bf1c0a025356bf05b6e28c"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// const db = getDatabase(app);
// const oStorage = getStorage(app);
// const githubProvider = new GithubAuthProvider();

// export const productDB = ref(db, 'products');
// export const cartDB = ref(db, 'carts');
// export const orderDB = ref(db, 'orders');
// export const memberDB = ref(db, 'members');
// export const noticeDB = ref(db, 'notice');
// export const reviewDB = ref(db, 'review');

// export { auth, githubProvider, signInWithPopup, oStorage };