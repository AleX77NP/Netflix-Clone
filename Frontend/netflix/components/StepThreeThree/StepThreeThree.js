import React, { useState } from 'react'
import NextButton from '../NextButton/NextButton'
import styles from './StepThreeThree.module.css'
import { useUserContext } from '../../context/userContext'
import {SEVEN, SET_PROFILES} from '../../constants/steps'
import {baseURL} from '../../constants/api'
import authRequests from '../../api/authRequests'

const StepThreeThree = () => {

    const {state, dispatch} = useUserContext();

    const [profile2, setProfile2] = useState('')
    const [profile3, setProfile3] = useState('')
    const [profile4, setProfile4] = useState('')
    const [profile5, setProfile5] = useState('')

    const signUp = async(data) => {
        try {
            const res = await fetch(`${baseURL}/${authRequests.signup}`,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(data)
            })
            const resJson = await res.json();
            console.log(resJson);
            dispatch({type: SEVEN})
        } catch(e) {
            alert('Signup failed.')
            console.log(e);
        }
    }

    const formatProfilesAndSignup = (prof1,prof2,prof3,prof4) => {
        const firstProfile = {
            'name': state.name,
            'image': '/images/profiles/profile1.png'
        };
        let profiles = [prof1, prof2, prof3, prof4]
        let final = [firstProfile]
        profiles.forEach(elem => {
            if(elem !== '') {
                let p = {
                    'name': elem,
                    'image': `/images/profiles/profile${profiles.indexOf(elem)+2}.png`
                }
                final.push(p)
            }
        })
        dispatch({type: SET_PROFILES, payload: final})
        let info = {
            'email': state.email,
            'password': state.password,
            'name': state.name,
            'surname': state.surname,
            'profiles': final,
            'plan': state.plan
        }
        signUp(info)
    }


    return (
        <div className={styles.container}>
            <p className={styles.header}>Who will be watching Netflix?</p>
            <p className={styles.info}>Just a few more steps and you're done! We hate paperwork, too.</p>
            <label className={styles.label}>Name</label>
            <input type="text" className={styles.input} placeholder="Name" value={state.name} readOnly />
            <label className={styles.label}>Name</label>
            <input type="text" className={styles.input} placeholder="Name" onChange={(e) => setProfile2(e.target.value)}  />
            <label className={styles.label}>Name</label>
            <input type="text" className={styles.input} placeholder="Name" onChange={(e) => setProfile3(e.target.value)} />
            <label className={styles.label}>Name</label>
            <input type="text" className={styles.input} placeholder="Name" onChange={(e) => setProfile4(e.target.value)} />
            <label className={styles.label}>Name</label>
            <input type="text" className={styles.input} placeholder="Name" onChange={(e) => setProfile5(e.target.value)} />
            <NextButton text="Finish" isDisabled={false} onPress={() => formatProfilesAndSignup(profile2,profile3,profile4,profile5)} />
        </div>
    )
}

export default StepThreeThree
