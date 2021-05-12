import { useState } from 'react'
import NextButton from '../NextButton/NextButton'
import styles from './StepOneTwo.module.css'

const StepOneTwo = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [pwdError, setPwdError] = useState('')

    const validateEmail = (email) => {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const validatePassword = (password) => {
        return password.length >= 6
    }

    const handleEmail = (value) => {
        if(validateEmail(value)) {
            setEmail(value)
            setEmailError('')
        } else {
            setEmailError("Email address is not valid.")
        }
    }

    const handlePassword = (value) => {
        if(validatePassword(value)) {
            setPassword(value)
            setPwdError('')
        } else {
            setPwdError("Password must be 6 or more characters long.")
        }
    }

    return (
        <div className={styles.container}>
            <p className={styles.step}>STEP <span className={styles.span}>1</span> OF <span className={styles.span}>3</span></p>
            <p className={styles.header}>Create a password to start your membership.</p>
            <p className={styles.info}>Just a few more steps and you're done! We hate paperwork, too.</p>
            <label className={styles.label}>Email</label>
            <input type="email" className={styles.input} placeholder="Email" onChange={(e) => handleEmail(e.target.value)} />
            {emailError !== '' ? <p className={styles.error}>{emailError}</p> : null}
            <label className={styles.label}>Password</label>
            <input type="password" className={styles.input} placeholder="Add a password" onChange={(e) => handlePassword(e.target.value)} />
            {pwdError !== '' ? <p className={styles.error}>{pwdError}</p> : null}
            <input type="checkbox" className={styles.checkbox} /> <span>Please do not email me Netflix special offers.</span>
            <NextButton />
        </div>
    )
}

export default StepOneTwo
