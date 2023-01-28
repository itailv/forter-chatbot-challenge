import * as React from 'react';

import firebase from 'firebase/compat/app';

import { Button, Typography } from 'antd';

import style from './SignIn.module.css';


interface SignIn {
    auth: firebase.auth.Auth;
}

const SignIn: React.FC<SignIn> = ({auth}) => {
    
    const signInWithGoogle = (): void => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

    return (
        <div className={style.container}>
            <Typography.Title>🍪</Typography.Title>
            <Typography.Text>Welcome to the Cookie Chatbot!</Typography.Text>
            <br/>
            <Button onClick={signInWithGoogle}>Sign in with Google</Button>
        </div>
    );
};

export default SignIn;