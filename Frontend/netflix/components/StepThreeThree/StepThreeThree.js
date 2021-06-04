import React from 'react'
import NextButton from '../NextButton/NextButton'
import styles from './StepThreeThree.module.css'
import { useUserContext } from '../../context/userContext'
import {SEVEN} from '../../constants/steps'


const StepThreeThree = () => {

    const {state, dispatch} = useUserContext();

    return (
        <div className={styles.container}>
            <p className={styles.header}>Who will be watching Netflix?</p>
            <p className={styles.info}>Just a few more steps and you're done! We hate paperwork, too.</p>
            <label className={styles.label}>Name</label>
            <input type="text" className={styles.input} placeholder="Name" value={state.name} readOnly />
            <label className={styles.label}>Name</label>
            <input type="text" className={styles.input} placeholder="Name"  />
            <label className={styles.label}>Name</label>
            <input type="text" className={styles.input} placeholder="Name" />
            <label className={styles.label}>Name</label>
            <input type="text" className={styles.input} placeholder="Name" />
            <label className={styles.label}>Name</label>
            <input type="text" className={styles.input} placeholder="Name" />
            <NextButton text="Finish" isDisabled={false} onPress={() => dispatch({type: SEVEN})} />
        </div>
    )
}

export default StepThreeThree
