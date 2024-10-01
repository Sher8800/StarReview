import React from 'react'
import styles from '../styles/Form.module.css'
import Form from '../components/Form'

function AuthorizationPage() {
    return (
        <div className={styles.form_page}>
            <Form
                className={styles.form_page}
                textForm='Log in'
                btnText='Log in'
                nav='/registration'
                haveAccount="Don't have an account?"
                textLink='Create account' />
        </div>
    )
}

export default AuthorizationPage
