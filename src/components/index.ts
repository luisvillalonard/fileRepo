
/* Titles */
import { TitlePage } from "../components/titles"
import { useButtons } from "./buttons"
import { useContainers } from "./containers"
import { useInputs } from "./inputs"
import { useLayout } from "./layout"
import { useProviders } from "./providers"

export function useComponents() {

    const { ButtonDefault, ButtonPrimary, ButtonDanger, ButtonEdit, ButtonText } = useButtons()
    const { Container, FormModal, Loading, PanelPos } = useContainers()
    const { Searcher } = useInputs()
    const { HeaderApp, MenuApp, RutasApp } = useLayout()
    const { ContextsProviders, StyleProvider } = useProviders()

    return {

        /* Buttons */
        ButtonDefault,
        ButtonPrimary,
        ButtonDanger,
        ButtonEdit,
        ButtonText,

        /* Containers */
        Container,
        FormModal,
        Loading,
        PanelPos,

        /* Inputs */
        Searcher,

        /* Layout */
        HeaderApp,
        MenuApp,
        RutasApp,

        /* Providers */
        ContextsProviders,
        StyleProvider,

        /* Titles */
        TitlePage,

    }

}