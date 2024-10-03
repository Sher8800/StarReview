import React, { useMemo, useState } from 'react'
import styles from '../styles/CommentsPageComponent.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { FaStar } from 'react-icons/fa';
import { useCreateCommentMutation, useGetAllCommentsQuery } from '../api/api';
import { userSelector } from '../redux/slices/userSlice';
import { useParams } from 'react-router-dom';
import { addCommentToUser, usersSelector } from '../redux/slices/usersSlice';
import { MdDeleteOutline } from "react-icons/md";
import { useForm } from 'react-hook-form';

function CommentsPageComponent({ userPage, user }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { isValid },
    } = useForm({ mode: 'all' })

    const dispatch = useDispatch()
    const params = useParams()

    const { id: recipientId } = params
    const { id: commenterId, roles } = useSelector(userSelector)
    const { users } = useSelector(usersSelector)

    // const isAdmin = roles.includes("ADMIN");

    const [createCommitApi] = useCreateCommentMutation()
    const { data: allComments } = useGetAllCommentsQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const userComments = useMemo(() => {
        return allComments?.filter(cmt => cmt.recipient === recipientId)
    }, [allComments, recipientId]);

    const commentAuthor = useMemo(() => {
        return users?.filter(user => user._id === userComments.author)
    }, [users, recipientId]);

    console.log(userComments);



    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(null)

    const onSubmit = async (formData, e) => {
        e.stopPropagation()
        try {
            const response = await createCommitApi({ ...formData, commenterId, recipientId, }).unwrap()
            dispatch(addCommentToUser({ userId: recipientId, comment: response }))
            setRating(0)
            setHover(null)
            reset()

        } catch (error) {
            console.log('Error adding a comment:', error);
        }
    }

    return (
        <div className={styles.comments_page_container}>
            <h2 className={styles.title}>Comments</h2>

            <div className={styles.comments_container}>
                {userComments.map((comment, i) => (
                    <div key={i} className={styles.comment_container}>
                        <div className={styles.username_icon_container}>
                            <h6 className={styles.username}>{user.username}</h6>
                            {
                                <MdDeleteOutline
                                    className={styles.icon_delete}
                                />
                            }
                        </div>
                        <p className={styles.comment}>{comment.comments}</p>
                    </div>
                ))}
            </div>

            {userPage &&
                <form onSubmit={handleSubmit(onSubmit)} className={styles.inp_comment_box}>
                    <input
                        {...register('comment', {
                            required: "Field is required!"
                        })}
                        className={styles.input} type="text"
                        placeholder='Comment...' />

                    <div className={styles.rating_container}>
                        {[...Array(5)].map((star, index) => {
                            const currentRating = index + 1;
                            return (
                                <label key={index}>
                                    <input
                                        {...register('rating')}
                                        type="radio"
                                        name="rating"
                                        style={{ display: 'none' }}
                                        value={currentRating}
                                        onClick={() => setRating(currentRating)}
                                    />
                                    <FaStar
                                        size={30}
                                        color={currentRating <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                                        onMouseEnter={() => setHover(currentRating)}
                                        onMouseLeave={() => setHover(null)}
                                        className={styles.star}
                                    />
                                </label>
                            );
                        })}
                    </div>

                    <button
                        disabled={!isValid || !rating}
                        className={styles.btn}>
                        Add
                    </button>
                </form>
            }
        </div>
    )
}

export default CommentsPageComponent
