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

const Profile = () => {

    const {state, dispatch} = useUserContext();

    const [myPlan, setMyPlan] = useState(null)
    const [failed, setFailed] = useState(false)

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
                setMyPlan(resJson)
                toast.dark('Plan loaded.')
            } else {
                toast.dark('Error loading plan.')
                console.log(res)
                setFailed(true)
            }
        } catch(e) {
            toast.dark('Error occured. Please try again later')
            console.log(e)
        }
    }

    useEffect(() => {
        fetchPlan();
    },[failed])

    const onChangePlan = (value) => {
        console.log(value)
        setMyPlan(value)
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
                        <p style={{fontWeight: 'bold'}}>{myPlan ? getPlanAndPlans(myPlan) : 'Loading...'}</p>
                        </div>
                        <div id={styles.plan_info}>
                            <button className={styles.edit_btn}>Save</button>
                        </div>
                        <hr style={{marginTop: '60px'}} />
                        <div className={styles.content_part}>
                            <p style={{color: 'gray', fontSize: '18px'}}>PROFILE &#38; PARENTAL CONTROLS</p>
                            <div style={{marginBottom: '25px'}}>
                                {
                                    state.authUser && state.authUser.user.profiles.map((profile) => (
                                        <div className={styles.content_part} key={profile.name}>
                                            <img src={profile.image} className={styles.profile_img} alt="profile-img" />
                                            <p>{profile.name}</p>
                                            <div>
                                            <img src="/images/delete.png" className={styles.delete}  alt="profile-delete" />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div id={styles.buttons}>
                            <input style={{width: '150px'}} placeholder="Profile..." />
                            <button className={styles.btn_add} style={{width: '50px'}}>Add</button>
                        </div>
                    </div>
                </section>
            </div>
            <div className={styles.footer_wrapper}>
                <LightFooter />
                <button onClick={logout}>Logout</button>
            </div>
        </div>
        </AuthLayout>
    )
}

export default Profile
