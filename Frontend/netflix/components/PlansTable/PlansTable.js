import React from 'react'
import styles from './PlansTable.module.css'
import {plans} from '../../data/plans'
import { useUserContext } from '../../context/userContext'

const PlansTable = () => {

    const {state} = useUserContext();

    return (
            <table className={styles.table}>
                <tbody>
                    <tr>
                        <td className={styles.th_cell}>Monthly price</td>
                        <td className={state.plan === 1 ? styles.td_cell_active : styles.td_cell}>EUR{plans[0].monthlyPrice}</td>
                        <td className={state.plan === 2 ? styles.td_cell_active : styles.td_cell}>EUR{plans[1].monthlyPrice}</td>
                        <td className={state.plan === 3 ? styles.td_cell_active : styles.td_cell}>EUR{plans[2].monthlyPrice}</td>
                    </tr>
                    <tr>
                        <td className={styles.th_cell}>Video quality</td>
                        <td className={state.plan === 1 ? styles.td_cell_active : styles.td_cell}>{plans[0].videoQuality}</td>
                        <td className={state.plan === 2 ? styles.td_cell_active : styles.td_cell}>{plans[1].videoQuality}</td>
                        <td className={state.plan === 3 ? styles.td_cell_active : styles.td_cell}>{plans[2].videoQuality}</td>
                    </tr>
                    <tr>
                        <td className={styles.th_cell}>Resolution</td>
                        <td className={state.plan === 1 ? styles.td_cell_active : styles.td_cell}>{plans[0].resolution}</td>
                        <td className={state.plan === 2 ? styles.td_cell_active : styles.td_cell}>{plans[1].resolution}</td>
                        <td className={state.plan === 3 ? styles.td_cell_active : styles.td_cell}>{plans[2].resolution}</td>
                    </tr>
                    <tr id={styles.bottom_tr}>
                        <td className={styles.th_cell}>Watch on your TV, computer, mobile phone and tablet</td>
                        <td className={state.plan === 1 ? styles.td_cell_active : styles.td_cell}>&#10003;</td>
                        <td className={state.plan === 2 ? styles.td_cell_active : styles.td_cell}>&#10003;</td>
                        <td className={state.plan === 3 ? styles.td_cell_active : styles.td_cell}>&#10003;</td>
                    </tr>
                </tbody>
            </table>
    )
}

export default PlansTable
