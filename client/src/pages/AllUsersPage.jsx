import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/Users.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { removeUsers, usersSelector } from '../redux/slices/usersSlice'
import { userSelector } from '../redux/slices/userSlice'
import avatar from '../images/avatar.png'
import { MdDeleteOutline } from "react-icons/md";
import { useDeleteUserMutation } from '../api/api'

function AllUsersPage() {
    const dispatch = useDispatch()
    const { users } = useSelector(usersSelector)
    const { roles, id: adminId } = useSelector(userSelector)


    const [deleteUser] = useDeleteUserMutation();

    const isAdmin = roles.includes("ADMIN");
    console.log(users);

    const handleDelete = async (e, userId) => {
        e.stopPropagation()
        try {
            await deleteUser(userId).unwrap();
            dispatch(removeUsers(userId))
        } catch (error) {
            console.error('Failed to delete user', error);
        }
    };

    return (
        <div className={styles.container}>
            {users && users.map((user) => (
                <div className={styles.user_container}
                    key={user._id}>
                    <Link
                        className={styles.link}
                        to={`/user/${user._id}`}
                        state={{ user: user }}>
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
                        </div>
                    </Link>
                    <div className={styles.role_icon_box}>
                        <h5>{user.roles[0]}</h5>
                        {isAdmin && user._id != adminId &&
                            <MdDeleteOutline
                                className={styles.icon_delete}
                                onClick={(e) => handleDelete(e, user._id)} />
                        }
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AllUsersPage
