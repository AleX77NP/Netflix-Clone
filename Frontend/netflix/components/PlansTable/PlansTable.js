import React from 'react'
import styles from './PlansTable.module.css'
import {plans} from '../../data/plans'
import { useUserContext } from '../../context/userContext'

const PlansTable = () => {

    const {state} = useUserContext();

    return (
        <div className={styles.table_wrapper}>
            <table className={styles.table}>
                <tbody>
                    <tr>
                        <th scope="row">Monthly price</th>
                        <td><p className={state.plan === 1 ? styles.p_active : styles.p}>EUR{plans[0].monthlyPrice}</p></td>
                        <td><p className={state.plan === 2 ? styles.p_active : styles.p}>EUR{plans[1].monthlyPrice}</p></td>
                        <td><p className={state.plan === 3 ? styles.p_active : styles.p}>EUR{plans[2].monthlyPrice}</p></td>
                    </tr>
                    <tr>
                        <th scope="row">Video quality</th>
                        <td><p className={state.plan === 1 ? styles.p_active : styles.p}>{plans[0].videoQuality}</p></td>
                        <td><p className={state.plan === 2 ? styles.p_active : styles.p}>{plans[1].videoQuality}</p></td>
                        <td><p className={state.plan === 3 ? styles.p_active : styles.p}>{plans[2].videoQuality}</p></td>
                    </tr>
                    <tr>
                        <th scope="row">Resolution</th>
                        <td><p className={state.plan === 1 ? styles.p_active : styles.p}>{plans[0].resolution}</p></td>
                        <td><p className={state.plan === 2 ? styles.p_active : styles.p}>{plans[1].resolution}</p></td>
                        <td><p className={state.plan === 3 ? styles.p_active : styles.p}>{plans[2].resolution}</p></td>
                    </tr>
                    <tr id={styles.bottom_tr}>
                        <th scope="row">Watch on your TV, computer, mobile phone and tablet</th>
                        <td><p className={state.plan === 1 ? styles.p_active_check : styles.p_check}>&#10003;</p></td>
                        <td><p className={state.plan === 2 ? styles.p_active_check : styles.p_check}>&#10003;</p></td>
                        <td><p className={state.plan === 3 ? styles.p_active_check : styles.p_check}>&#10003;</p></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default PlansTable
