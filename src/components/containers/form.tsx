import { Button, Form, Modal } from "antd"
import { ControlProps } from "../../interfaces/globales"

const FormModal = (props: Pick<ControlProps, "children" | "name" | "title" | "isOpen" | "size" | "item" | "onCancel" | "onChange">) => {

    const { children, name, title, isOpen, size, item, onCancel, onChange } = props

    const handleOk = () => {
        if (onChange) {
            onChange(item);
        }
    };

    return (
        <Modal
            open={isOpen}
            title={<span style={{ fontSize: 18, fontWeight: 500 }}>{title}</span>}
            centered
            closable={false}
            onOk={handleOk}
            onClose={onCancel}
            onCancel={onCancel}
            footer={[
                <Button key="1" type="default" shape="round" htmlType="button" onClick={onCancel}>Cancelar</Button>,
                <Button key="2" type="primary" shape="round" htmlType="submit" form={name}>Guardar</Button>
            ]}>
            <Form
                name={name}
                layout="vertical"
                autoComplete="off"
                size={size ?? "large"}
                initialValues={item}
                onFinish={handleOk}>
                {children}
            </Form>
        </Modal>
    )
}
export default FormModal;
