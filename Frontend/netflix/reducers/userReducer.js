import {ONE_TWO, TWO, THREE, FOUR, FIVE, SIX, SEVEN, SET_EMAIL, SET_PLAN, SET_NAME, SET_SURNAME, SET_PROFILES, BACK} from '../constants/steps'
import {SET_AUTH_USER_TOKEN, SET_PROFILE, REMOVE_AUTH_USER_TOKEN} from '../constants/api'

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
        case BACK:
            return {
                ...state,
                step: state.step - 1
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
        case SET_PROFILES:
            return {
                ...state,
                profiles: action.payload
            }
        case SET_AUTH_USER_TOKEN:
            return {
                ...state,
                authUser: action.payload
            }
        case SET_PROFILE:
            return {
                ...state,
                profileImage: action.payload,
                profileSelected: true
            }
        case REMOVE_AUTH_USER_TOKEN:
            return {
                ...state,
                authUser: null,
                profileSelected: false
            }
        default:
            return state
    }
}