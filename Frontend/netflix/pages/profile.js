import React from 'react'
import authRequests from '../api/authRequests';
import { baseURL, SET_AUTH_USER_TOKEN } from '../constants/api';
import { useUserContext } from '../context/userContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'

const profile = () => {

    const {state, dispatch} = useUserContext();

    const router = useRouter();

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
                dispatch({type: SET_AUTH_USER_TOKEN, payload: null})
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
        <div>
            <ToastContainer />
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default profile
