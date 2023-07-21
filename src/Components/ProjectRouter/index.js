import {Route, Routes} from "react-router-dom";

import Home from "../Home";
import HeaderBar from "../HeaderBar";
import Signup from "../Signup";
import {Layout} from "antd";
import {Footer} from "antd/es/layout/layout";
import Verify from "../Verify";

export default function ProjectRouter(props) {
    return (
        <Layout>
            <HeaderBar datapack={props.datapack}/>
            <Routes>
                <Route exact={true} path={"/"} element={<Home datapack={props.datapack}/>}></Route>
                <Route exact={false} path={"/signup"} element={<Signup datapack={props.datapack}/>}></Route>
                <Route path={"/root"} element={<Verify datapack={props.datapack}/>}></Route>
            </Routes>
            <Footer>
                版权所有@app
            </Footer>
        </Layout>
    )
}