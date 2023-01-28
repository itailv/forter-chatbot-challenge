import * as React from 'react';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

import SignIn from '../components/SignIn';
import Chat from '../components/Chat';

import style from './App.module.css';


firebase.initializeApp({
    apiKey: "AIzaSyAeKHxqRsFBKQ_EEVPEqGBuU9pncsDtPUA",
    authDomain: "forter-chatbot-5bf1b.firebaseapp.com",
    projectId: "forter-chatbot-5bf1b",
    storageBucket: "forter-chatbot-5bf1b.appspot.com",
    messagingSenderId: "976926740648",
    appId: "1:976926740648:web:9212ef9a6330de9fe7b29d",
    measurementId: "G-C41HGH73TX"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

const App: React.FC = () => {

    const [user] = useAuthState(auth as any);

    return (
        <div className={style.container}>
            {user ? <Chat store={firestore} auth={auth}/> : <SignIn auth={auth}/>}
        </div>
    );
};

export default App;