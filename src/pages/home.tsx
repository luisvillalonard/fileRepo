import { Flex } from "antd";
import { useData } from "../hooks/useData";

const HomePage = () => {

    const { contextAuth: { state: { user } } } = useData()

    return (
        <Flex align="center" justify="center" style={{ width: '100%', height: '100%' }}>
            <div className="display-5">Bienvenido(a), {`${user?.nombres} ${user?.apellidos}`.trim()}</div>
        </Flex>
    )
}
export default HomePage;
