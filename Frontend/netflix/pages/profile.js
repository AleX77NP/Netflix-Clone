import React, { useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Profile.module.css'
import authRequests from '../api/authRequests';
import { baseURL, REMOVE_AUTH_USER_TOKEN } from '../constants/api';
import { useUserContext } from '../context/userContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import AuthLayout from '../components/AuthLayout/AuthLayout';
import MainNav from '../components/MainNav/MainNav';
import LightFooter from '../components/LightFooter/LightFooter'
import paymentRequests from '../api/paymentRequests';
import { plans } from '../data/plans';
import MyProfile from '../components/MyProfile/MyProfile';
import { getAvailPicture, getSize } from '../utils/arrays';
import { profileImages } from '../data/profileImages';
import { mutate } from 'swr'
import { currentDate } from '../utils/date';

const Profile = () => {

    const {state, dispatch} = useUserContext();

    const [myPlan, setMyPlan] = useState(null)
    const [failed, setFailed] = useState(false)
    const [newProfile, setNewProfile] = useState("")

    const router = useRouter();

    const fetchPlan = async() => {
        try {
            const res = await fetch(`${baseURL}/${paymentRequests.get}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'JWT': state.authUser?.token
                },
            });
            const resJson = await res.json();
            if(res.status == 200) {
                toast.dark('Plan loaded.',{autoClose: 1000})
                setMyPlan(resJson)
            } else {
                //toast.dark('Error loading plan.')
                console.log(res)
                setFailed(true)
            }
        } catch(e) {
            toast.dark('Error occured. Please try again later')
            console.log(e)
        }
    }

    useEffect(() => {
        fetchPlan()
    },[failed])

    const onChangePlan = (value) => {
        console.log(value)
        setMyPlan(value)
    }

    const updatePlan = async() => {
        try {
            let data = {
                "plan": myPlan,
                "last_modified": currentDate()
            };
            const res = await fetch(`${baseURL}/${paymentRequests.change}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'JWT': state.authUser?.token
                },
                body: JSON.stringify(data)
            });
            const resJson = await res.json();
            if(res.status == 200) {
                toast.dark('Plan updated.',{autoClose: 1000})
                console.log(resJson)
            } else {
                toast.dark('Error updating plan.')
                console.log(res)
            }
        } catch(e) {
            toast.dark('Error occured. Please try again later')
            console.log(e)
        }
    }

    const getPlanAndPlans = (planId) => {
        let p = plans.find(plan => plan.id === planId)
        return <select style={{width: '180px'}} value={myPlan} onChange={(e) => onChangePlan(e.target.value)}>
            {
                plans.map((plan) => (
                    <option key={plan.id} value={plan.id}>{`${plan.title} ${plan.resolution} ${plan.monthlyPrice}$`}</option>
                ))
            }
        </select>
    }

    const logout = async() => {
        try {
            const res = await fetch(`${baseURL}/${authRequests.signout}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                  credentials: 'include',
                  body: JSON.stringify({})
            })
            if (res.ok) {
                dispatch({type: REMOVE_AUTH_USER_TOKEN})
                await router.replace('/landing')
            } else {
                toast.dark('Error occured. Please try again later.')
            }
        } catch(e) {
            toast.dark('Error occured on server. Please try again later.')
            console.log(e)
        }
    }

    const addNewProfile = async() => {
        try {
            let data = {
                "profile": {
                    "name": newProfile,
                    "image": getAvailPicture(state.authUser.user.profiles, profileImages)
                }
            }
            const res = await fetch(`${baseURL}/${authRequests.addProfile}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                  },
                  credentials: 'include',
                  body: JSON.stringify(data)
            })
            const resJson = await res.json();
            if(res.status !== 200) {
                if(res.status === 401) {
                    toast.dark(resJson.message)
                } else {
                    toast.dark("Error occured while adding profile.")
                }
            } else {
                toast.dark(resJson.message)
                mutate(`${baseURL}/${authRequests.me}`)
                setNewProfile('')
            }
        } catch(e) {
            toast.dark('Error occured on server. Please try again later.')
            console.log(e)
        }
    }

    const deleteProfile = async(myProfile) => {
        try {
            let data = {
                "profile": {
                    "name": myProfile.name,
                    "image": myProfile.image
                }
            }
            const res = await fetch(`${baseURL}/${authRequests.removeProfile}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                  },
                  credentials: 'include',
                  body: JSON.stringify(data)
            })
            const resJson = await res.json();
            if(res.status !== 200) {
                if(res.status === 401) {
                    toast.dark(resJson.message)
                } else {
                    toast.dark("Error occured while adding profile.")
                }
            } else {
                toast.dark(resJson.message)
                mutate(`${baseURL}/${authRequests.me}`)
                setNewProfile('')
            }
        } catch(e) {
            toast.dark('Error occured on server. Please try again later.')
            console.log(e)
        }
    }

    return (
        <AuthLayout>
            <div className={styles.body}>
                <Head>
                    <title>Netflix</title>
                    <meta name="description" content="Netflix Clone" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <header className={styles.nav}>
                    <MainNav />
                </header>
            <div style={{minHeight: '100vh'}}>
                <ToastContainer />
                <section className={styles.main}>
                    <div className={styles.content}>
                        <p className={styles.account}>Account</p>
                        <hr />
                        <div className={styles.content_part}>
                            <p style={{color: 'gray', fontSize: '18px'}}>MEMBERSHIP &#38; BILLING</p>
                            <p style={{fontWeight: 'bold'}}>{state.authUser?.user.email}</p>
                        </div>
                        <div className={styles.content_part}>
                            <button className={styles.cancel_btn}>Cancel Membership</button>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <img style={{width: '40px'}} src="/images/mastercard.jpg" alt="mcard" />
                                <span style={{marginLeft: '5px'}}>•••• •••• •••• 1234</span>
                            </div>
                        </div>
                        <hr style={{marginTop: '60px'}} />
                        <div className={styles.content_part}>
                        <p style={{color: 'gray', fontSize: '18px'}}>PLAN DETAILS</p>
                        <p style={{fontWeight: 'bold'}}>{myPlan ? getPlanAndPlans(myPlan) : 'Plan not available'}</p>
                        </div>
                        <div id={styles.plan_info}>
                            <button onClick={updatePlan} className={styles.edit_btn}>Save</button>
                        </div>
                        <hr style={{marginTop: '60px'}} />
                        <div className={styles.content_part}>
                            <p style={{color: 'gray', fontSize: '18px'}}>PROFILE &#38; PARENTAL CONTROLS</p>
                            <div style={{marginBottom: '25px'}}>
                                {
                                    state.authUser && state.authUser.user.profiles.map((profile) => (
                                        <MyProfile key={profile.name} profile={profile} onRemove={() => deleteProfile(profile)} />
                                    ))
                                }
                            </div>
                        </div>
                        <div id={styles.buttons}>
                            <input style={{width: '150px'}} placeholder="Profile..." onChange={(e) => setNewProfile(e.target.value)} />
                            <button disabled={getSize(state.authUser?.user.profiles) === 5 ? true : false} onClick={addNewProfile} className={styles.btn_add} style={{width: '50px'}}>Add</button>
                        </div>
                        <hr id={styles.above_btn}  style={{marginTop: '60px'}} />
                        <button className={styles.logout_btn} onClick={logout}>Logout</button>
                    </div>
                </section>
            </div>
            <hr style={{border: '0.5px solid lightgray'}} />
            <div className={styles.footer_wrapper}>
                <LightFooter />
            </div>
        </div>
        </AuthLayout>
    )
}

export default Profile
