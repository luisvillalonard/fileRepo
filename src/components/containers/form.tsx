import { Button, Drawer, Space, Form, ModalProps, Modal } from "antd"
import { Store } from "antd/es/form/interface"
import { useConstants } from "../../hooks/useConstants"
import { useIconos } from "../../hooks/useIconos"
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
            {/* <Modal.Footer>
                <button className="btn btn-default rounded-pill" onClick={cancelar}>Cancelar</button>
                <button type="button" form="formUsuario" className="btn btn-primary rounded-pill ms-auto" onClick={Guardar}>Guardar</button>
                <Button key="1" type="text" shape="circle" htmlType="button" icon={<IconClose color={Colors.White} className="fs-4" />} onClick={onClose} />
                <Button key="2" shape="round" type="primary" htmlType="submit" form={name} loading={loading}>Guardar</Button>
            </Modal.Footer> */}
        </Modal>
    )
}
export default FormModal;
