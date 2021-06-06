import React, { useState } from 'react'
import NextButton from '../NextButton/NextButton'
import styles from './StepThreeThree.module.css'
import { useUserContext } from '../../context/userContext'
import {SEVEN, SET_PROFILES} from '../../constants/steps'
import {baseURL} from '../../constants/api'
import authRequests from '../../api/authRequests'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StepThreeThree = () => {

    const {state, dispatch} = useUserContext();

    const [profile2, setProfile2] = useState('')
    const [profile3, setProfile3] = useState('')
    const [profile4, setProfile4] = useState('')

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
            if(res.ok) {
            dispatch({type: SEVEN}) 
            } else {
                toast.dark(resJson.message)
            }
        } catch(e) {
            toast.dark(JSON.stringify(e))
            console.log(e);
        }
    }

    const formatProfilesAndSignup = (prof1,prof2,prof3) => {
        const firstProfile = {
            'name': state.name,
            'image': '/images/profiles/profile1.png'
        };
        const kidsProfile = {
            'name': 'Kids',
            'image': '/images/profiles/kids.png'
        }
        let profiles = [prof1, prof2, prof3]
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
        final.push(kidsProfile);
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
            <input type="text" className={styles.input} placeholder="Name" value="Kids" readOnly />
            <label className={styles.label}>Name</label>
            <input type="text" className={styles.input} placeholder="Name" onChange={(e) => setProfile2(e.target.value)}  />
            <label className={styles.label}>Name</label>
            <input type="text" className={styles.input} placeholder="Name" onChange={(e) => setProfile3(e.target.value)} />
            <label className={styles.label}>Name</label>
            <input type="text" className={styles.input} placeholder="Name" onChange={(e) => setProfile4(e.target.value)} />
            <ToastContainer />
            <NextButton text="Finish" isDisabled={false} onPress={() => formatProfilesAndSignup(profile2,profile3,profile4)} />
        </div>
    )
}

export default StepThreeThree
