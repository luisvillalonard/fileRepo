import cookie from 'cookie'
import { decrypt, encrypt } from './useUtils'

export type CookieOptions = {
        expire?: number | Date
        maxAge?: number
        domain?: string
        path?: string
        secure?: boolean
        httpOnly?: boolean
}

export enum CookieEnum {
        User = '_rf.usr',
        Token = '_rf.tk',
        Menu = '_rf.mn',
}

export const setCookie = (type: CookieEnum, value: string, options: CookieOptions = { path: '/' }) => {

        if (!value) return;

        const encryptText = encrypt(value) as string;
        document.cookie = cookie.serialize(type, encryptText, options)
}

export const getCookie = (name: CookieEnum): string | undefined => {

        if (document.cookie.length === 0) return undefined;

        const cookies = cookie.parse(document.cookie)
        const value = cookies && cookies[name]

        if (value === undefined || typeof value === 'undefined') {
                return undefined;
        }

        const decryptText = decrypt(value) as string | undefined
        if (!decryptText) {
                return undefined;
        }

        return decryptText;
}

export const removeCookie = (type: CookieEnum) => {

        const options: CookieOptions = { expires: new Date(1970, 1, 1, 0, 0, 1), maxAge: 0, path: '/' } as CookieOptions;
        document.cookie = cookie.serialize(type, '', options);

}

export const removeAllCookies = () => {

        const options: CookieOptions = { expires: new Date(1970, 1, 1, 0, 0, 1), maxAge: 0, path: '/' } as CookieOptions;
        document.cookie = cookie.serialize(CookieEnum.User, '', options);
        document.cookie = cookie.serialize(CookieEnum.Token, '', options);
        document.cookie = cookie.serialize(CookieEnum.Menu, '', options);

}