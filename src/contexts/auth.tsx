import { createContext, useEffect, useReducer } from "react"
import { ControlProps } from "../interfaces/globales"
import authReducer, { initState } from "../reducers/auth"
import { CookieEnum, getCookie, removeAllCookies, setCookie } from "../hooks/useCookies"
import { Usuario } from "../interfaces/entidades"
import { SessionStorageEnum } from "../enums/storage"

export interface AuthState {
    user: Usuario | undefined;
    token: string | undefined,
    viewMenu: boolean;
    viewInfoUser: boolean,
}

export interface AuthContextState {
    state: AuthState,
    setToken: (value: string) => void,
    LoggedIn: (user: Usuario) => void,
    LoggedOut: () => void,
    showMenu: () => void,
    showUserInfo: () => void,
    getUser: () => void
}

export const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export const AuthProvider = ({ children }: ControlProps) => {

    const [state, dispatch] = useReducer(authReducer, initState)

    const setToken = (value: string | undefined) => {

        if (value) {
            setCookie(CookieEnum.Token, value)
            dispatch({ type: 'TOKEN', token: value })
        } else {
            dispatch({ type: 'SIGN_OUT' })
        }

    }

    const getUser = () => {

        const valor: string | undefined = getCookie(CookieEnum.User)
        if (valor) {
            let jsonUser: Usuario = JSON.parse(valor)
            if (typeof jsonUser === 'string') {
                jsonUser = JSON.parse(jsonUser)
            }
            dispatch({ type: 'SIGN_IN', payload: jsonUser })
        } else {
            dispatch({ type: 'SIGN_OUT' })
        }

    }

    const LoggedIn = (user: Usuario) => {

        setCookie(CookieEnum.User, JSON.stringify(user))
        dispatch({ type: 'SIGN_IN', payload: user })
        sessionStorage.setItem(SessionStorageEnum.Token, user.token ?? '')
        sessionStorage.setItem(SessionStorageEnum.MenuOpen, 'true')

    }

    const LoggedOut = () => {

        removeAllCookies();
        dispatch({ type: 'SIGN_OUT' })

    }
    
    const showMenu = () => {
        const menuOpen = sessionStorage.getItem(SessionStorageEnum.MenuOpen);
        if (menuOpen) {
            dispatch({ type: 'SHOW_MENU', open: menuOpen === 'true' ? false : true })
            sessionStorage.setItem(SessionStorageEnum.MenuOpen, menuOpen === 'true' ? 'false' : 'true')
        }
    }

    const showUserInfo = () => {
        const menuOpen = sessionStorage.getItem(SessionStorageEnum.MenuOpen);
        if (menuOpen) {
            dispatch({ type: 'SHOW_USER_INFO', open: menuOpen === 'true' ? false : true })
        }
    }

    useEffect(() => {
        getUser()
    }, [])
    
    return (
        <AuthContext.Provider value={{
            state,
            LoggedIn,
            LoggedOut,
            setToken,
            getUser,
            showMenu,
            showUserInfo,
}}>
            {children}
        </AuthContext.Provider>
    )
}