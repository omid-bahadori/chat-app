import React, { useState, useEffect, useContext } from 'react';
import { auth } from '../firebase';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import axios from 'axios';

// Components
import Navbar from './Navbar';

// Styles
import styles from "./Chats.module.css";

// Context
import { AuthContext } from '../Contexts/AuthContextProvider';


const Chats = () => {

    const [loading, setLoading] = useState(true);
    const user = useContext(AuthContext);

    const history = useHistory();

    useEffect(() => {
        if (!user) {
            history.push('/');
        }

        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                'project-id': '0fa07320-4a63-4d2b-9147-aea0c2faced9',
                'user-name': user.email,
                'user-secret': user.uid
            }
        })
        .then(() => {
            setLoading(false);
        })
        .catch(() => {
            let formData = new FormData();
            formData.append('email', user.email);
            formData.append('username', user.email);
            formData.append('secret', user.uid)
            getFile(user.photoURL)
                .then(avatar => {
                    formData.append('avatar', avatar, avatar.name)
                    axios.post('https://api.chatengine.io/users/', formData, {
                        headers: {
                            'private-key': '63e44ff1-6d8e-4bbd-9675-0d8ab41d945e'
                        }
                    })
                    .then(() => setLoading(false))
                    .catch(error => console.log(error))
                })
        })

    }, [user, history]);

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data], 'userPhoto.jpg', {type: 'image/jpeg'})
    }

    const logoutHandler = async () => {
        await auth.signOut()
        history.push('/')
    }

    if (!user || loading) return 'Loading...';

    return (
        <div className={styles.container}>
            <Navbar logoutHandler={logoutHandler} />
            <ChatEngine 
                height='calc(100vh - 50px)'
                projectID='0fa07320-4a63-4d2b-9147-aea0c2faced9'
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    );
};

export default Chats;