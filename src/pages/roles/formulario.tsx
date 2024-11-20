import { useEffect } from "react";
import { useData } from "../../hooks/useData"
import { Alerta, Exito } from "../../hooks/useMensaje"
import { Rol } from "../../interfaces/entidades"
import { Form, Input, Space, Switch } from "antd"
import { useForm } from "../../hooks/useForm"
import FormModal from "../../components/containers/form"

const RolFormulario = () => {

    const { contextRoles: { state: { modelo }, agregar, actualizar, cancelar } } = useData()
    const { entidad, editar, handleChangeInput } = useForm<Rol | undefined>(modelo)

    const guardar = async () => {

        if (!entidad) {
            return;
        }

        let res;
        let esNuevo: boolean = entidad.id && entidad.id > 0 ? false : true;

        if (esNuevo)
            res = await agregar(entidad);
        else {
            res = await actualizar(entidad);
        }

        if (res.ok) {
            Exito(`Rol de usuario  ${esNuevo ? 'agregado' : 'actualizado'} exitosamente!`);
        } else {
            Alerta(res.mensaje || 'No fue posible guardar los datos del rol de usuario.');
        }

    }

    useEffect(() => { editar(modelo) }, [modelo])

    if (!entidad) { return <></> }

    return (
        <FormModal
            name="formRol"
            title="Rol de Usuario"
            isOpen={true}
            onCancel={cancelar}
            onChange={guardar}
            item={entidad}>
            <Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Input name="nombre" value={entidad.nombre || ''} maxLength={50} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item valuePropName="checked">
                <Space>
                    <Switch checked={entidad.esAdmin} onChange={(checked) => editar({ ...entidad, esAdmin: checked })} />
                    <span>Es Administrador</span>
                </Space>
            </Form.Item>
        </FormModal>
    )
}
export default RolFormulario;
