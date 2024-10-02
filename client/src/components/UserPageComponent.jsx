import React from 'react'
import styles from '../styles/UserPageComponent.module.css'
import userFoto from '../images/userFoto.png'
import { useSelector } from 'react-redux'
import { commentsSelector } from '../redux/slices/commentsSlice';
import CommentsPageComponent from './CommentsPageComponent';

function UserPageComponent({ username, email, roles, userPage }) {

    const { comments } = useSelector(commentsSelector)

    return (
        <div className={styles.container}>
            <div className={styles.user_info}>
                <div className={styles.user_foto} style={{ backgroundImage: `url(${userFoto})` }}>
                </div>

                <div className={styles.user_data_container}>
                    <h2 className={styles.user_name}>
                        {username}
                    </h2>
                    <p className={styles.user_data}>
                        Email: <br /> <span>{email}</span>
                    </p>
                    <p className={styles.user_data}>
                        Role: <span>{roles}</span>
                    </p>
                    <p className={styles.user_data}>
                        Rating: <span>5</span>
                    </p>
                </div>
            </div>
            <CommentsPageComponent userPage={userPage} />
        </div>
    )
}

export default UserPageComponent
