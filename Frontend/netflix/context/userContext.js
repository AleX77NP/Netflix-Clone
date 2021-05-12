import { createContext, useContext, useReducer} from 'react'
import { stepReducer } from '../reducers/userReducer'

const UserContext = createContext();

const initialStepState = {
    step: 0
}

export function AppWrapper({children}) {

    const [state, dispatch] = useReducer(stepReducer, initialStepState)
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