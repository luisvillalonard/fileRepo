import { ChangeEvent, useState } from "react";
import { fileBase64, GetFileBase64 } from "./useUtils";

export function useForm<T>(initState: T) {

    const [entidad, setEntidad] = useState<T>(initState);

    const editar = (item: T) => {
        setEntidad(item)
    }

    const handleChangeInput = async ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { type, name, value } = target;

        let elementValue: string | boolean | number | null = value;

        switch (type) {
            case 'checkbox':
            case 'switch':
                elementValue = (target as HTMLInputElement).checked;
                break;

            case 'radio':
                elementValue = value.toLowerCase() === 'true';
                break;

            case 'number':
            case 'select-one':
                elementValue = Number(value);
                break;

            default:
                break;
        }

        setEntidad({
            ...entidad,
            [name]: elementValue
        })
    }

    const handleChangeInputFiles = async ({ target }: ChangeEvent<HTMLInputElement>): Promise<string | undefined> => {
        
        const { files } = target;
        let elementValue: string | undefined = undefined;

        if (files && files.length > 0) {
            elementValue = await fileBase64(files.item(0)) as string | undefined;
        }

        return elementValue;
    }

    return {
        entidad,
        editar,
        handleChangeInput,
        handleChangeInputFiles,
    }

}