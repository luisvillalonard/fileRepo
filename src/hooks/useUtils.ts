import { useNavigate } from "react-router-dom"
import { RequestFilter } from "../interfaces/globales"
import { GetProp, UploadProps } from "antd"
import * as CryptoJS from 'crypto-js'
import { secretKey } from "./useConstants";

type StringOrNull = string | null | undefined;

export const getParamsUrlToString = (params: RequestFilter | null | undefined) => {

    if (!params) return '';

    const searchParams: Record<string, any> = new URLSearchParams();

    if (params?.pageSize)
        searchParams.append('pageSize', params.pageSize);

    if (params?.currentPage)
        searchParams.append('currentPage', params.currentPage);

    if (params?.filter)
        searchParams.append('filter', params.filter);

    if (searchParams.length === 0)
        return '';

    return '?' + searchParams.toString();
}

export const FormatDate_DDMMYYYY = (fecha: StringOrNull) => {
    if (!fecha)
        return null;

    try {
        // 1900-01-01 - YEAR-MONTH-DAY
        let [day, month, year] = fecha.split('-');

        day = day.length <= 1 ? '0'.concat(day) : day;
        month = month.length <= 1 ? '0'.concat(month) : month;

        // 01/01/1900 - DAY-MONTH-YEAR
        return [day, month, year].reverse().join('/');
    } catch (e) { }
}

export const FormatDate_YYYYMMDD = (fecha: string): StringOrNull => {
    if (!fecha)
        return null;

    try {
        // 01/01/1900 - DAY-MONTH-YEAR
        let [day, month, year] = fecha.split('/');

        day = day.length <= 1 ? '0'.concat(day) : day;
        month = month.length <= 1 ? '0'.concat(month) : month;

        // 1900-01-01 - YEAR-MONTH-DAY
        return [day, month, year].reverse().join('-');
    } catch (e) { }
}

export const GetTimeFromString = (time: string | null | undefined): Date | null => {
    if (!time)
        return null;

    try {
        // 01/01/1900 - DAY-MONTH-YEAR
        let [hours, minutes, seconds] = time.split(':');

        const tiempo: Date = new Date(1900, 1, 1, Number(hours), Number(minutes), Number(seconds));

        // 1900-01-01 - YEAR-MONTH-DAY
        return tiempo;
    } catch (e) { }

    return null;
}

export const GetFileBase64 = (file: any) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

export const fileBase64 = (img: any) => {
    return new Promise((resolve, reject) => {
        let fileReader = new FileReader();
        fileReader.onerror = reject
        fileReader.onload = function () {
            resolve(fileReader.result)
        }
        fileReader.readAsDataURL(img)
    })
}

export type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
export const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export const base64toBlob = (data: string) => {
    // Cut the prefix `data:application/pdf;base64` from the raw base 64
    const base64WithoutPrefix = data.substring('data:application/pdf;base64,'.length);

    const bytes = atob(base64WithoutPrefix);
    let length = bytes.length;
    let out = new Uint8Array(length);

    while (length--) {
        out[length] = bytes.charCodeAt(length);
    }

    return new Blob([out], { type: 'application/pdf' });
};

export function IsNullOrUndefined(e: any) {
    if (e === "undefined") {
        return true;
    } else if (e === undefined) {
        return true;
    } else if (e === null) {
        return true;
    };
    return false;
}

export const encrypt = (valor: any) => {
    if (!valor) {
        return null;
    }

    return CryptoJS.AES.encrypt(JSON.stringify(valor), secretKey).toString();
}

export const decrypt = (valor: any) => {
    if (!valor) {
        return null;
    }

    const bytes = CryptoJS.AES.decrypt(valor, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}

export const navUrl = (url: string) => {
    const nav = useNavigate();
    nav(url, { replace: true });
}

export function ToTitleCase(value: string) {
    const newStr = value.split(' ')
        .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
        .join(' ');

    return newStr;
}