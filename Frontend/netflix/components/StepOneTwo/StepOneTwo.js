import { useEffect, useState } from 'react'
import NextButton from '../NextButton/NextButton'
import styles from './StepOneTwo.module.css'
import { validatePassword } from '../../utils/validation/password'
import { useEmail} from '../../hooks/useEmail'
import { useUserContext } from '../../context/userContext'
import { TWO } from '../../constants/steps'

const StepOneTwo = () => {

    const {email, emailError, isValid, handleEmail} = useEmail('')
    const [password, setPassword] = useState('')
    const [pwdError, setPwdError] = useState('')

    const {state, dispatch} = useUserContext();

    const handlePassword = (value) => {
        if(validatePassword(value)) {
            setPassword(value)
            setPwdError('')
        } else {
            setPwdError("Password must be 6 or more characters long.")
        }
    }

    useEffect(() => {
        handleEmail(state.email)
    },[])

    const validateInputs = () => {
        return isValid && validatePassword(password)
    }

    return (
        <div className={styles.container}>
            <p className={styles.step}>STEP <span className={styles.span}>1</span> OF <span className={styles.span}>3</span></p>
            <p className={styles.header}>Create a password to start your membership.</p>
            <p className={styles.info}>Just a few more steps and you're done! We hate paperwork, too.</p>
            <label className={styles.label}>Email</label>
            <input type="email" className={styles.input} placeholder="Email" value={state.email} readOnly={true} />
            {emailError !== '' ? <p className={styles.error}>{emailError}</p> : null}
            <label className={styles.label}>Password</label>
            <input type="password" className={styles.input} placeholder="Add a password" onChange={(e) => handlePassword(e.target.value)} />
            {pwdError !== '' ? <p className={styles.error}>{pwdError}</p> : null}
            <input type="checkbox" className={styles.checkbox} /> <span>Please do not email me Netflix special offers.</span>
            <NextButton text="Continue" isDisabled={!validateInputs()} onPress={() => dispatch({type: TWO})} />
        </div>
    )
}

export default StepOneTwo
