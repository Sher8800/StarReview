import React, { useState } from 'react'
import styles from '../styles/CommentsPageComponent.module.css'
import { useDispatch } from 'react-redux'
import { FaStar } from 'react-icons/fa';

function CommentsPageComponent({ userPage }) {
    const [comment, setComment] = useState(null)
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(null)
    const dispatch = useDispatch()

    const addHandler = (e) => {
        e.stopPropagation()
    }
    return (
        <div className={styles.comments_page_container}>
            <h2 className={styles.title}>Comments</h2>

            <div className={styles.comments_container}>
                {
                    <div className={styles.comment_container}>
                        <div className={styles.username_icon_container}>
                            <h6 className={styles.username}></h6>
                            <img className={styles.delete} src="" alt="" />
                        </div>
                        <p className={styles.comment}></p>
                    </div>
                }
            </div>

            {userPage &&
                <form className={styles.inp_comment_box}>
                    <input
                        onChange={e => setComment(e.target.value)} className={styles.input} type="text"
                        placeholder='Comment...' />

                    <div className={styles.rating_container}>
                        {[...Array(5)].map((star, index) => {
                            const currentRating = index + 1;
                            return (
                                <label key={index}>
                                    <input
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

                    <button onClick={addHandler} className={styles.btn}>Add</button>
                </form>
            }
        </div>
    )
}

export default CommentsPageComponent
