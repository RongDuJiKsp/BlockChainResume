import {Content} from "antd/es/layout/layout";
import "./index.css"
import EmployeePage from "../EmployeePage";
import EmployerPage from "../EmployerPage";
import RootPage from "../RootPage";

export default function Home(props) {
    const StatusGiveAway = {
        "root": <RootPage datapack={props.datapack} modelhandle={props.modelhandle}/>,
        "employer": <EmployerPage datapack={props.datapack} modelhandle={props.modelhandle}/>,
        "employee": <EmployeePage datapack={props.datapack} modelhandle={props.modelhandle}/>,
    }
    return (
        <div>
            <Content style={{height: "900px"}} className={"HomeContent"}>
                <div id={"HomeCardList"}>
                    {StatusGiveAway[props.datapack.loginState]}
                </div>
            </Content>
        </div>
    )
}