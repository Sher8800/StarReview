import React from 'react'
import styles from '../styles/UserPageComponent.module.css'
import userFoto from '../images/userFoto.png'
import CommentsPageComponent from './CommentsPageComponent';

function UserPageComponent({ user, userPage, authUserId }) {
    if (!user) {
        return (
            <p>Loading...</p>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.user_info}>
                <div className={styles.user_foto} style={{ backgroundImage: `url(${userFoto})` }}>
                </div>

                <div className={styles.user_data_container}>
                    <h2 className={styles.user_name}>
                        {user.username}
                    </h2>
                    <p className={styles.user_data}>
                        Email: <br /> <span>{user.email}</span>
                    </p>
                    <p className={styles.user_data}>
                        Role: <span>{user.roles}</span>
                    </p>
                    <p className={styles.user_data}>
                        Rating: <span>5</span>
                    </p>
                </div>
            </div>
            <CommentsPageComponent userPage={userPage} authUserId={authUserId} />
        </div>
    )
}

export default UserPageComponent
