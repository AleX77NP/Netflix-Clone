import React, { useEffect, useState } from 'react'
import styles from './StepThreeTwo.module.css'
import Image from 'next/image'
import { useUserContext } from '../../context/userContext'
import {plans} from '../../data/plans'
import {SET_NAME, SET_SURNAME, SIX} from '../../constants/steps'

const StepThreeTwo = () => {

    const [plan, setPlan] = useState({})
    const {state, dispatch} = useUserContext();

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')

    useEffect(() => {
        setPlan(plans.find(plan => plan.id == state.plan))
    },[])


    const onSubmitForm = (e) => {
        e.preventDefault();
        if (name.length >= 2 && surname.length >= 2) {
        dispatch({type: SET_NAME, payload: name})
        dispatch({type: SET_SURNAME, payload: surname})
        dispatch({type: SIX})
        } else {
            alert("Please enter valid name and surname.")
        }
    }

    return (
        <div className={styles.container}>
            <p className={styles.step}>STEP <span className={styles.span}>3</span> OF <span className={styles.span}>3</span></p>
            <p className={styles.header}>Set up your credit or debit card.</p>
            <Image src="/images/creditcards.png" alt="payment" width={120} height={25} />
            <form onSubmit={onSubmitForm}>
            <input type="text" className={styles.input} onChange={(e) => setName(e.target.value)} placeholder="First Name" required />
            <input type="text" className={styles.input} onChange={(e) => setSurname(e.target.value)} placeholder="Last Name" required />
            <input type="text" className={styles.input} placeholder="Card Number" required />
            <input type="text" className={styles.input} placeholder="Expiration Date (MM/YY)" required />
            <input type="text" className={styles.input} placeholder="Security Code (CVV)" required />
            <div className={styles.plan_info}>
                <div className={styles.plan}>
                    <p className={styles.price}>EUR{plan.monthlyPrice}/month</p>
                    <p className={styles.plan_title}>{plan.title} Plan</p>
                </div>
                <a className={styles.change_plan}>Change</a>
            </div> 
            <p className={styles.terms}>
            By checking the checkbox below, you agree to our <span className={styles.terms_blue}>Terms of Use, Privacy Statement</span>, and that you are over 18. Netflix will automatically continue your membership and charge the monthly membership fee (currently EUR9.99) to your payment method until you cancel. You may cancel at any time to avoid future charges.
            </p>
            <input type="checkbox" className={styles.checkbox} /> <span className={styles.agree}>I agree.</span>

            <button className={styles.start} type="submit">Start Membership</button>
            </form>
        </div>
    )
}

export default StepThreeTwo
