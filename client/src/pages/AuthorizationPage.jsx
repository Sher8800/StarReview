import React, { useState } from 'react'
import styles from '../styles/AuthPages.module.css'
import Form from '../components/Form'
import { useLoginMutation } from '../api/api'
import { Link } from 'react-router-dom'

function AuthorizationPage() {
    const [catchErrors, setCatchErrors] = useState(null)

    const [loginApi] = useLoginMutation()

    setTimeout(() => {
        const showErrorsMessage = () => {
            setCatchErrors(null)
        }
    }, 300);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Log in</h2>
            <div className={styles.form_container}>
                <div className={styles.form_box}>
                    <Form
                        setCatchErrors={setCatchErrors}
                        loginApi={loginApi}
                        btnText='Log in' />

                    <div className={styles.greetings_container}>
                        {!catchErrors ?
                            <>
                                <h2>Glad to see You!</h2>
                                <p>
                                    Please sign in to your account to continue. If you don’t have an account yet, feel free to <Link className={styles.have_account} to="/registration">register here</Link>.
                                </p>
                            </>
                            :
                            <>
                                <h2>{catchErrors?.data?.message}</h2>
                                <p>Please enter correct details</p>
                                {/* {showErrorsMessage()} */}
                            </>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthorizationPage
