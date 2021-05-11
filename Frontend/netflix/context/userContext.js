import { createContext, useContext} from 'react'

const UserContext = createContext();

export function AppWrapper({children}) {
    let state = {
        step: 1
    }

    return (
        <UserContext.Provider value={state}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    return useContext(UserContext);
}