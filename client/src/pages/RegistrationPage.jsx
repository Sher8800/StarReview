import React from 'react'
import styles from '../styles/AuthPages.module.css'
import Form from '../components/Form'
import { Link } from 'react-router-dom'

function RegistrationPage() {
    return (
        <div className={styles.container}>
            <div className={styles.form_page}>
                <Form
                    registrationPage={true}
                    textForm='Sign up'
                    btnText='Create account'
                    nav='/authorization'
                    haveAccount='Have an account?'
                    textLink='Log in' />

                <div className={styles.greetings_container}>
                    <h2>Create Your Account</h2>
                    <p>Join us today and enjoy the full experience! <br /> Fill in your details to get started. Already have an account? <br />
                        <Link className={styles.have_account} to="/authorization">Sign in here</Link>.
                    </p>

                </div>
            </div>
        </div>
    )
}

export default RegistrationPage
