import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from '../styles/Users.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, usersSelector } from '../redux/slices/usersSlice'
import avatar from '../images/avatar.png'
import { useGetAllUsersQuery } from '../api/api'

function AllUsersPage() {
    const dispatch = useDispatch()
    const { users } = useSelector(usersSelector)

    const { data: allUsers, isLoading, isError, error } = useGetAllUsersQuery()

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error: {error.message}</p>

    dispatch(getUsers(allUsers))


    return (
        <div className={styles.container}>
            {users && users.map(user => (
                <NavLink
                    to={`/user/${user._id}`}
                    state={{ user: user }}
                    className={styles.user_container}
                    key={user.id}>
                    <div
                        className={styles.user_avatar}
                        style={{ backgroundImage: `url(${avatar})` }}>
                    </div>
                    <div className={styles.user_data}>
                        <div>
                            <h2 className={styles.user_name}>{user.username}</h2>
                            <p>{user.email}</p>
                            <p>{user.rating}</p>
                        </div>
                        <h5>{user.roles[0]}</h5>
                    </div>
                </NavLink>
            ))}
        </div>
    )
}

export default AllUsersPage
