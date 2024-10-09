import React, { useMemo } from 'react'
import styles from '../styles/UserPageComponent.module.css'
import userFoto from '../images/userFoto.png'
import CommentsPageComponent from './CommentsPageComponent';
import { useSelector } from 'react-redux';
import { commentsSelector } from '../redux/slices/commentsSlice';

function UserPageComponent({ user, userPage, authUserId }) {

    const commentsState = useSelector(commentsSelector);
    const { comments } = commentsState;

    const userComments = useMemo(() => {
        return comments.filter(cmt => cmt.recipient === user._id)
    }, [comments, user._id]);

    const sumRating = userComments.reduce((acc, comment) => acc + comment.rating, 0);
    const averageRating = (sumRating / userComments.length).toFixed(1);

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
                        Rating: <span>{averageRating > 0 ? averageRating : 0}</span>
                    </p>
                </div>
            </div>
            <CommentsPageComponent userPage={userPage} authUserId={authUserId} />
        </div>
    )
}

export default UserPageComponent
