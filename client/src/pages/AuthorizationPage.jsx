import React from 'react'
import styles from '../styles/AuthPages.module.css'
import Form from '../components/Form'
import { useLoginMutation } from '../api/api'
import { Link } from 'react-router-dom'

function AuthorizationPage() {

    const [loginApi] = useLoginMutation()


    return (
        <div className={styles.container}>
            <div className={styles.form_page}>
                <Form
                    loginApi={loginApi}
                    className={styles.form_page}
                    textForm='Log in'
                    btnText='Log in'
                    nav='/registration'
                    haveAccount="Don't have an account?"
                    textLink='Create account' />

                <div className={styles.greetings_container}>
                    <h2>Glad to see You!</h2>
                    <p>
                        Please sign in to your account to continue. If you don’t have an account yet, feel free to <Link className={styles.have_account} to="/registration">register here</Link>.
                    </p>

                </div>
            </div>
        </div>
    )
}

export default AuthorizationPage
