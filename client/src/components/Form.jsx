import React, { useState } from 'react'
import styles from '../styles/Form.module.css'
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { IoIosPerson } from "react-icons/io";
import { LuEyeOff } from "react-icons/lu";

function Form(props) {
    const [viewPassword, setViewPassword] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm({ mode: 'onBlur' })

    const showPassword = (e) => {
        e.stopPropagation()
        setViewPassword(!viewPassword)
    }

    const onSubmit = (data, e) => {
        e.stopPropagation()
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form_container}>
            <label onClick={e => e.stopPropagation()} className={styles.inputs_container}>
                {props.textForm}

                {props.registrationPage &&
                    <div className={styles.input_container}>
                        <input
                            {...register('name', {
                                required: "Field is required!"
                            })}
                            className={styles.input_name}
                            type="text"
                            id="name" />
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
                        id="email" />
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
                        id="password" />
                    <label className={styles.placeholder} htmlFor="password">
                        <span><RiLockPasswordLine /></span>
                        Password
                    </label>
                    <LuEyeOff className={styles.icon_eye} onClick={showPassword} />
                    <p className={styles.error_message}>{errors?.password?.message}</p>
                </div>
            </label>


            <button disabled={!isValid} className={styles.btn}>{props.btnText}</button>

            <span className={styles.have_account}>
                {props.haveAccount} <NavLink className={styles.log_in} to={props.nav}>{props.textLink}</NavLink>
            </span>
        </form>
    )
}

export default Form
