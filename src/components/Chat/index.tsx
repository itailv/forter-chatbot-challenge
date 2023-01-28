import * as React from 'react';
import moment from 'moment';
import {orderBy} from  'lodash';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { Button, Input, List, Avatar, Tag, Result } from 'antd';
import { RobotFilled, SendOutlined } from '@ant-design/icons';

import { BOT_UID, checkForBotAnswer } from '../../utils/bot';

import style from './Chat.module.css';


interface MessageType {
    id: string;
    uid: string;
    text: string;
    photoURL: string;
    createdAt: {seconds: number, nanoseconds: number};
}

interface Chat {
    store: firebase.firestore.Firestore;
    auth: firebase.auth.Auth;
}

const Chat: React.FC<Chat> = ({ store, auth }) => {
    const [input, setInput] = React.useState<string>('');

    const messagesRef = store.collection('messages');          
    const [messages] = useCollectionData<MessageType>(messagesRef, {idField: 'id'});
    const messagesSorted = orderBy(messages, 'createdAt', 'asc');

    const sendMessage = async(e: React.SyntheticEvent): Promise<void> => {
        e.preventDefault();
        const {uid, photoURL} = auth.currentUser as firebase.User;

        await messagesRef.add({
            text: input,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        });

        const botResponse = checkForBotAnswer(input);
        await botResponse && messagesRef.add({
                text: botResponse,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid: BOT_UID,
        });

        setInput('');
    }

    return (
        <div className={style.container}>

            <div className={style.header}>
                <Avatar src={auth.currentUser?.photoURL}/>
                🍪 Cookie Chat Bot 🍪
                <Button onClick={() => auth.signOut()}>Sign Out</Button>
            </div>

            <div className={style.messagesContainer}>
                { 
                messagesSorted.length ?
                <List
                    size='large'
                    dataSource={messagesSorted}
                    renderItem={(msg) => (
                    <List.Item key={msg.id}>
                        <List.Item.Meta
                            avatar={msg.uid === BOT_UID ? <Avatar icon={<RobotFilled/>}/> : <Avatar src={msg.photoURL} />}
                            title={msg.text}
                            description={auth.currentUser?.uid === msg.uid ? 'sent' : 'received'}
                        />
                        {msg?.createdAt?.seconds && <Tag>{moment.unix(msg.createdAt.seconds).format('hh:mm')}</Tag> }
                    </List.Item>
                    )}
                />
                :
                <Result
                    status="404"
                    subTitle="Messages you send will appear here"
                />
                }
            </div>
            
            <div className={style.footer}>
                <Input value={input} onChange={(e) => setInput(e.target.value)} />
                <Button
                        onClick={sendMessage}
                        disabled={input.length <= 0}
                        className={!(input.length <= 0) ? style.addTodoButton : style.addTodoButtonDisabled}
                        type={"primary"}
                        icon={<SendOutlined style={{ fontSize: 18, marginTop: 2}} />}
                    />
            </div>
        </div>
    );
};

export default Chat;