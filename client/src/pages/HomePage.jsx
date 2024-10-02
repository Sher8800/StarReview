import React from 'react'
import styles from '../styles/Home.module.css'
import userFoto from '../images/userFoto.png'
import { userSelector } from '../redux/slices/userSlice'
import { useSelector } from 'react-redux'

function HomePage() {

    const { username, email, roles } = useSelector(userSelector)


    return (
        <div className={styles.container}>
            <div className={styles.user_info}>
                <div className={styles.user_foto} style={{ backgroundImage: `url(${userFoto})` }}>
                </div>

                <div >
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
            <div className={styles.comments_container}>
                <h2 className={styles.title}>Comments</h2>
            </div>

        </div>
    )
}

export default HomePage
