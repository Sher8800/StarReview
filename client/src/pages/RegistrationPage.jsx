import React from 'react'
import styles from '../styles/AuthPages.module.css'
import Form from '../components/Form'
import { Link } from 'react-router-dom'
import { useRegistrationMutation } from '../api/api'

function RegistrationPage() {

    const [registerApi] = useRegistrationMutation()

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Sign up</h2>
            <div className={styles.form_container}>
                <div className={styles.form_box}>
                    <Form
                        registerApi={registerApi}
                        registrationPage={true}
                        btnText='Create account' />

                    <div className={styles.greetings_container}>
                        <h2>Create Your Account</h2>
                        <p>Join us today and enjoy the full experience! <br /> Fill in your details to get started. Already have an account? <br />
                            <Link className={styles.have_account} to="/authorization">Sign in here</Link>.
                        </p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegistrationPage
