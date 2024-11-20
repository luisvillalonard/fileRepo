import { Button } from 'antd'
import type { ButtonProps } from 'antd'

export const ButtonText = (props: ButtonProps) => {

    const { shape, icon, onClick } = props

    return (
        <Button
            {...props}
            type="text"
            shape={shape ?? "round"}
            icon={icon}
            onClick={onClick}>
        </Button>
    )
}