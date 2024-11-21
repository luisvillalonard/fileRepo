import { AuthState } from "../contexts/auth"
import { Usuario } from "../interfaces/entidades"

type AuthAction =
    | { type: 'SIGN_IN', payload: Usuario | undefined }
    | { type: 'SIGN_OUT' }
    | { type: 'SHOW_USER_INFO', open: boolean }
    | { type: 'SHOW_MENU', open: boolean }

export const initState: AuthState = {
    user: undefined,
    viewMenu: true,
    viewInfoUser: false,
}

export default function authReducer(state: AuthState, action: AuthAction): AuthState {
    
    switch (action.type) {

        case 'SIGN_IN':
            return { ...state, user: action.payload, }

        case 'SIGN_OUT':
            return { ...state, user: undefined }

        case 'SHOW_MENU':
            return { ...state, viewMenu: action.open, }

        case 'SHOW_USER_INFO':
            return { ...state, viewInfoUser: action.open, }
    
        default:
            return state;
    }

}
