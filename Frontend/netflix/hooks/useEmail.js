import { useState } from "react"
import { validateEmail } from '../utils/validation/email'

export const useEmail = (initialValue = '') => {
    const [email, setEmail] = useState(initialValue)
    const [isValid, setIsValid] = useState(false)
    const [emailError, setEmailError] = useState('')

    const handleEmail = (value) => {
        if(validateEmail(value)) {
            setEmail(value)
            setEmailError('')
            setIsValid(true)
        } else {
            setEmailError("Email address is not valid.")
            setIsValid(false)
        }
    }

    return {email, emailError, isValid, handleEmail}
}