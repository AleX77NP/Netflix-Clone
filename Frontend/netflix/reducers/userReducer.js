import {ONE_TWO, TWO, THREE, FOUR, FIVE, SIX, SEVEN, SET_EMAIL, SET_PLAN, SET_NAME, SET_SURNAME} from '../constants/steps'

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
                password: action.payload
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
        case FIVE:
            return {
                ...state,
                step: 5
            }
        case SIX:
            return {
                ...state,
                step: 6
            }
        case SEVEN:
            return {
                ...state,
                step: 7
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
        case SET_NAME:
            return {
                ...state,
                name: action.payload
            }
        case SET_SURNAME:
            return {
                ...state,
                surname: action.payload
            }
        default:
            return state
    }
}