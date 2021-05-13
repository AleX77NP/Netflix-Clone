import {ONE_TWO, TWO, THREE, FOUR, SET_EMAIL, SET_PLAN} from '../constants/steps'

export const userReducer = (state, action) => {
    switch(action.type) {
        case ONE_TWO:
            return {
                ...state,
                step: 1,
            }
        case TWO:
            return {
                ...state,
                step: 2,
            }
        case THREE:
            return {
                ...state,
                step: 3,
            }
        case FOUR:
            return {
                ...state,
                step: 4
            }
        case SET_EMAIL:
            return {
                ...state,
                email: action.payload
            }
        case SET_PLAN:
            return {
                ...state,
                plan: action.payload
            }
        default:
            return state
    }
}