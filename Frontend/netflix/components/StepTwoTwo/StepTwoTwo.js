import React from 'react'
import PlanBox from '../PlanBox/PlanBox'
import styles from './StepTwoTwo.module.css'
import {plans} from '../../data/plans'
import { useUserContext } from '../../context/userContext'
import { FOUR, SET_PLAN } from '../../constants/steps'
import PlansTable from '../PlansTable/PlansTable'
import NextButton from '../NextButton/NextButton'

const StepTwoTwo = () => {

    const {state, dispatch} = useUserContext();

    return (
        <div className={styles.container}>
            <div className={styles.step_wrapper}>
            <p className={styles.step}>STEP <span className={styles.span}>2</span> OF <span className={styles.span}>3</span></p>
            <p className={styles.header}>Choose the plan that’s right for you</p>

            <div className={styles.check_list}>
                <p className={styles.check_item}><span className={styles.mark}>&#10003;</span> Watch all you want. Ad-free.</p>
                <p className={styles.check_item}><span className={styles.mark}>&#10003;</span> Recommendations just for you.</p>
                <p className={styles.check_item}><span className={styles.mark}>&#10003;</span> Change or cancel your plan anytime.</p>
            </div>
            </div> 

            <div className={styles.boxes}>
                {
                    plans.map((plan) => (
                        <div className={styles.box_wrapper} key={plan.id}>
                            <PlanBox selected={state.plan === plan.id} plan={plan.title} onPress={() => dispatch({type: SET_PLAN, payload: plan.id})} />
                        </div>
                    ))
                }
            </div>
            <PlansTable />   
            <small className={styles.small}>
            HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service and device capabilities. Not all content is available in all resolutions. See our Terms of Use for more details.
            </small>
            <br />
            <small className={styles.small}>
            Only people who live with you may use your account. Watch on 4 different devices at the same time with Premium, 2 with Standard and 1 with Basic.
            </small>

            <div className={styles.btn_wrapper}>
            <NextButton isDisabled={false} text="Continue" onPress={() => dispatch({type: FOUR})} />
            </div>
        </div>
    )
}

export default StepTwoTwo
