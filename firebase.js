import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";  
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD_dsPXb3iBS58DLbJKLcQ04r6PYZck6Yo",
    authDomain: "chatvui-462a9.firebaseapp.com",
    projectId: "chatvui-462a9",
    storageBucket: "chatvui-462a9.appspot.com",
    messagingSenderId: "757186341849",
    appId: "1:757186341849:web:c7e7ce4e3438402f7207c8"
    
};




const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore()

export {auth, db}


