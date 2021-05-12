import {ONE_TWO, TWO, THREE} from '../constants/steps'

export const stepReducer = (state, action) => {
    switch(action.type) {
        case ONE_TWO:
            return {
                step: 1
            }
        case TWO:
            return {
                step: 2
            }
        case THREE:
            return {
                step: 3
            }
        default:
            return state
    }
}