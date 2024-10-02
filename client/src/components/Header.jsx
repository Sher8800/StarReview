import React from 'react'
import styles from '../styles/Header.module.css'
import { Link } from 'react-router-dom'
import { PiSignOutLight } from "react-icons/pi";
import avatar from '../images/avatar.png'
import { useDispatch, useSelector } from 'react-redux';
import { exit, userSelector } from '../redux/slices/userSlice';

function Header() {

    const dispatch = useDispatch()

    const logOut = () => {
        dispatch(exit())
    }

    const { username } = useSelector(userSelector)

    return (
        <header>
            <div className={styles.header_container}>
                <Link to='/' className={styles.link}>
                    <div className={styles.user_img} style={{ backgroundImage: `url(${avatar})` }}>
                    </div>
                    {username}
                </Link>

                <Link to='allUsers' className={styles.link}>
                    All users
                </Link>

                <Link onClick={logOut} className={styles.logout}>
                    Log Out <PiSignOutLight />
                </Link>
            </div>
        </header>
    )
}

export default Header
