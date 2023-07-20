import {Header} from "antd/es/layout/layout";
import {Tag} from "antd";

export default function HeaderBar(props) {
    return (
            <Header>
                <button className={"btn red small"} onClick={props.datapack.logoutfunc}>Logout</button>
                <Tag color={"green"}><h2>你好，{props.datapack.loginState}</h2></Tag>
                {
                    props.datapack.loginState === props.datapack.StEnum.register ? "" :
                        <Tag color={"blue"}><h2>ID: {props.datapack.userId}</h2></Tag>
                }
                {
                    props.datapack.loginState === props.datapack.StEnum.register ? "" :
                        <Tag color={"pink"}><h2>key: {props.datapack.userPassword}</h2></Tag>
                }
            </Header>

    )
}