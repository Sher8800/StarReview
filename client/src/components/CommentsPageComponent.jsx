import React, { useMemo, useState } from 'react'
import styles from '../styles/CommentsPageComponent.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { FaStar } from 'react-icons/fa';
import { useCreateCommentMutation, useDeleteCommentMutation } from '../api/api';
import { userSelector } from '../redux/slices/userSlice';
import { useParams } from 'react-router-dom';
import { addCommentToUser, removeUserComment } from '../redux/slices/usersSlice';
import { MdDeleteOutline } from "react-icons/md";
import { useForm } from 'react-hook-form';
import { addComment, commentsSelector, removeComment } from '../redux/slices/commentsSlice';

function CommentsPageComponent({ userPage, authUserId }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { isValid },
    } = useForm({ mode: 'all' })

    const dispatch = useDispatch()
    const params = useParams()

    const { id: recipientId } = params

    const { id: authorId, roles } = useSelector(userSelector)

    const isAdmin = roles.includes("ADMIN");

    const [createCommitApi] = useCreateCommentMutation()
    const [deleteComment] = useDeleteCommentMutation()

    const commentsState = useSelector(commentsSelector);
    const { comments } = commentsState;

    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(null)

    const onSubmit = async (formData, e) => {
        e.preventDefault();
        e.stopPropagation()
        try {
            const response = await createCommitApi({ ...formData, authorId, recipientId, }).unwrap()
            dispatch(addComment(response.newComment))
            dispatch(addCommentToUser({ recipientId, commentId: response.newComment._id }))
            setRating(0)
            setHover(null)
            reset()

        } catch (error) {
            console.log('Error adding a comment:', error);
        }
    }

    const deleteUserComment = async (commentId) => {
        const response = await deleteComment(commentId)
        dispatch(removeComment(commentId))
        dispatch(removeUserComment({ recipientId, commentId }))
    }

    const userComments = useMemo(() => {
        return comments.filter(cmt => cmt.recipient === (!userPage ? authUserId : recipientId))
    }, [comments, recipientId]);

    return (
        <div className={styles.comments_page_container}>
            <h2 className={styles.title}>Comments</h2>

            <div className={styles.comments_container}>
                {userComments.map((comment, i) => (
                    <div key={i} className={styles.comment_container}>
                        <div className={styles.username_icon_container}>
                            <p className={styles.author_name}>{comment.authorName}</p>
                            {isAdmin &&
                                <MdDeleteOutline
                                    className={styles.icon_delete}
                                    onClick={() => deleteUserComment(comment._id)}
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
