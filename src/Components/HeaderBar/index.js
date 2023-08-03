import {Header} from "antd/es/layout/layout";
import {Tag} from "antd";
import {LoginStateEnum} from "../../Data/enums";
export default function HeaderBar(props) {
    return (
            <Header>
                <button className={"btn red small"} onClick={props.datapack.logoutfunc}>Logout</button>
                <Tag color={"green"}><h2>你好，{props.datapack.loginState}</h2></Tag>
                {
                    props.datapack.loginState === LoginStateEnum.register||props.datapack.loginState===LoginStateEnum.finder ? "" :
                        <Tag color={"blue"}><h2>ID: {props.datapack.userId}</h2></Tag>
                }
            </Header>

    )
}