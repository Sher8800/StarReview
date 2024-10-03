import React, { useState } from 'react'
import styles from '../styles/Form.module.css'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { IoIosPerson } from "react-icons/io";
import { LuEyeOff } from "react-icons/lu";
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import { addUser } from '../redux/slices/usersSlice';

function Form(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [viewPassword, setViewPassword] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm({ mode: 'all' })

    const showPassword = (e) => {
        e.stopPropagation()
        setViewPassword(!viewPassword)
    }

    const onSubmit = async (formData, e) => {
        try {
            e.stopPropagation()

            if (props.loginApi) {
                const response = await props.loginApi(formData).unwrap()
                dispatch(setUser(response))
                navigate('/')
            }

            if (props.registerApi) {
                const response = await props.registerApi(formData).unwrap()
                dispatch(setUser(response))
                dispatch(addUser(response))
                navigate('/')
            }

            reset()
        } catch (error) {
            console.error('Register failed:', error);
            props.setCatchErrors(error)
            setTimeout(() => {
                props.setCatchErrors(null)
            }, 3000);
            reset()
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form_container}>
            <label onClick={e => e.stopPropagation()} className={styles.inputs_container}>

                {props.registrationPage &&
                    <div className={styles.input_container}>
                        <input
                            {...register('name', {
                                required: "Field is required!"
                            })}
                            className={styles.input_name}
                            type="text"
                            id="name"
                            autoComplete="off" />
                        <label className={styles.placeholder} htmlFor="name">
                            <span><IoIosPerson /></span>
                            Name
                        </label>
                        <p className={styles.error_message}>{errors?.name?.message}</p>
                    </div>
                }

                <div className={styles.input_container}>
                    <input
                        {...register('email', {
                            required: "Field is required!",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email format"
                            }
                        })}
                        className={styles.input_email}
                        type="email"
                        id="email"
                        autoComplete="off" />
                    <label className={styles.placeholder} htmlFor="email">
                        <span><MdOutlineEmail /></span>
                        Email address
                    </label>
                    <p className={styles.error_message}>{errors?.email?.message}</p>
                </div>

                <div className={styles.input_container}>
                    <input
                        {...register('password', {
                            required: "Field is required!",
                            minLength: { value: 5, message: "Password must contain at least 5 characters" },
                        })}
                        className={styles.input_password}
                        type={viewPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="off" />
                    <label className={styles.placeholder} htmlFor="password">
                        <span><RiLockPasswordLine /></span>
                        Password
                    </label>
                    <LuEyeOff className={styles.icon_eye} onClick={showPassword} />
                    <p className={styles.error_message}>{errors?.password?.message}</p>
                </div>
            </label>


            <button disabled={!isValid} className={styles.btn}>{props.btnText}</button>
        </form>
    )
}

export default Form
