import { createContext, useContext, useReducer} from 'react'
import { userReducer } from '../reducers/userReducer'

const UserContext = createContext();

const initialStepState = {
    step: 0,
    email: '',
    password: '',
    plan: 1,
    name: '',
    surname: '',
}

export function AppWrapper({children}) {

    const [state, dispatch] = useReducer(userReducer, initialStepState)
    const value = {state, dispatch}

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    return useContext(UserContext);
}