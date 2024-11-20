import { useEffect } from "react";
import { useData } from "../../hooks/useData"
import { Alerta, Exito } from "../../hooks/useMensaje"
import { Usuario } from "../../interfaces/entidades"
import { Form, Input, Select, Switch } from "antd"
import { useForm } from "../../hooks/useForm"
import FormModal from "../../components/containers/form"

const UsuarioFormulario = () => {

    const { 
        contextUsuarios: { state: { modelo }, agregar, actualizar, cancelar },
        contextRoles: { state: { datos: roles, procesando: cargandoRoles }, todos },
} = useData();
    const { entidad, editar, handleChangeInput } = useForm<Usuario | undefined>(modelo);

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
            Exito(`Usuario  ${esNuevo ? 'agregado' : 'actualizado'} exitosamente!`);
        } else {
            Alerta(res.mensaje || 'No fue posible guardar los datos del usuario.');
        }

    };

    useEffect(() => { 
        editar(modelo);
        if (modelo) {
            (async () => { await todos() })()
        }
    }, [modelo])

    if (!entidad) { return <></> }

    return (
        <FormModal
            name="formUsuario"
            title="Usuario"
            isOpen={true}
            onCancel={cancelar}
            onChange={guardar}
            item={{
                ...entidad,
                rolId: modelo?.rol?.id,
            }}>
            <Form.Item label="Nombres" name="nombres" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Input name="nombres" value={entidad.nombres || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item label="Apellidos" name="apellidos" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Input name="apellidos" value={entidad.apellidos || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item label="Correo Electr&oacute;nico" name="correo" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Input name="correo" type="email" value={entidad.correo || ''} onChange={handleChangeInput} />
            </Form.Item>
            <Form.Item label="Perfíl" name="rolId" rules={[{ required: true, message: 'Obligatorio' }]}>
                <Select
                    loading={cargandoRoles}
                    value={entidad.rol?.id}
                    labelRender={(item) => !item ? <></> : <label>{item.label}</label>}
                    options={roles && roles.map(item => ({ key: item.id, value: item.id, label: item.nombre }))}
                    onChange={(value) => {
                        if (entidad) {
                            editar({ ...entidad, rol: roles?.filter(item => item.id === value)[0] })
                        }
                    }}>
                </Select>
            </Form.Item>
            <Form.Item label={entidad?.activo ? 'Activo' : 'Inactivo'} valuePropName="checked">
                <Switch checked={entidad.activo} onChange={(checked) => editar({ ...entidad, activo: checked })} />
            </Form.Item>
        </FormModal>
    )
}
export default UsuarioFormulario;
