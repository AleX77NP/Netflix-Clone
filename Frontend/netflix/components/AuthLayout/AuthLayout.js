import React, { useState } from 'react'
import authRequests from '../../api/authRequests'
import { baseURL, SET_AUTH_USER_TOKEN, SET_PROFILE } from '../../constants/api'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import Loading from '../Loading/Loading'
import { useUserContext } from '../../context/userContext'
import BrowseProfiles from '../BrowseProfiles/BrowseProfiles'

const AuthLayout = (props) => {

    const router = useRouter()

    const url = `${baseURL}/${authRequests.me}`

    const {state, dispatch} = useUserContext()

    const [ready, setReady] = useState(false)
    const [selected, setSelected] = useState(state.profileSelected ? true: false)

    const fetcher = async(url) => {
        const res = await fetch(url, {credentials: 'include'})
        const data = await res.json()
        if(!data.user) {
            await router.replace('/landing')
        } else {
            setReady(true)
            dispatch({type: SET_AUTH_USER_TOKEN, payload: data})
            return data
        }
    }

    const selectProfile = () => {
        setSelected(true)
        dispatch({type: SET_PROFILE})
    }

    const {data, error} = useSWR(url, fetcher)

    return data ? (
        <>
        {ready ? selected ? props.children : <BrowseProfiles profiles={data.user.profiles} setProfile={selectProfile} /> : <Loading />}
        </>
    ) : <Loading />
}

export default AuthLayout
