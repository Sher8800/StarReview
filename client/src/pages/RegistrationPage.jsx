import React from 'react'
import styles from '../styles/Form.module.css'
import Form from '../components/Form'

function RegistrationPage() {
    return (
        <div className={styles.form_page}>
            <Form
                registrationPage={true}
                textForm='Sign up'
                btnText='Create account'
                nav='/authorization'
                haveAccount='Have an account?'
                textLink='Log in' />
        </div>
    )
}

export default RegistrationPage
