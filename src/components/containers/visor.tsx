import { ControlProps } from "../../interfaces/globales"
import { base64toBlob } from "../../hooks/useUtils"
import { useEffect, useState } from "react"

const VisorPDF = (props: Pick<ControlProps, "item">) => {

    const { item } = props
    const [urlFile, setUrlFile] = useState<string | undefined>(undefined)


    const loadDocument = () => {

        const blob = base64toBlob(item);
        if (!blob) {
            setUrlFile(undefined);
            return;
        }

        const url = URL.createObjectURL(blob);
        if (!url) {
            setUrlFile(undefined);
            return;
        }

        setUrlFile(url);
    }

    useEffect(() => {
        if (item) { loadDocument() }
    }, [item])

    return (
        <iframe
            id="framePdf"
            title="Documento PDF"
            src={urlFile}
            width="100%"
            style={{
                position: 'relative',
                minHeight: '100px',
                maxHeight: '600px',
                height: '100%',
                width: '100%',
                overflow: 'auto',
                border: '1px solid #eee',
            }}>
        </iframe>
    )
}
export default VisorPDF
