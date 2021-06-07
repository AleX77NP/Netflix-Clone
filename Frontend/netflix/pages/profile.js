import React, { useEffect } from 'react'
import authRequests from '../api/authRequests';
import { baseURL, REMOVE_AUTH_USER_TOKEN } from '../constants/api';
import { useUserContext } from '../context/userContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import AuthLayout from '../components/AuthLayout/AuthLayout';

const profile = () => {

    const {state, dispatch} = useUserContext();

    const router = useRouter();

    useEffect(() => {
        console.log(state)
    })

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
            <ToastContainer />
            <button onClick={logout}>Logout</button>
        </AuthLayout>
    )
}

export default profile
