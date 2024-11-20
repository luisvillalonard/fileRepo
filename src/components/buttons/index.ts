import { ButtonDanger } from "./danger";
import { ButtonDefault } from "./default";
import { ButtonEdit } from "./edit";
import { ButtonPrimary } from "./primary";
import { ButtonText } from "./text";

export function useButtons() {

    return {
        ButtonDefault,
        ButtonPrimary,
        ButtonDanger,
        ButtonEdit,
        ButtonText,
    }

}