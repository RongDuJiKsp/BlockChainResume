import {Route, Routes} from "react-router-dom";

import Home from "../Home";
import {Layout, Tag} from "antd";
import {Header} from "antd/es/layout/layout";
import Signup from "../Signup";

export default  function ProjectRouter(props){
return(
   <div>
       <Layout>
           <Header id={"HomeHeader"}>
               <button className={"btn red small"} onClick={props.datapack.logoutfunc}>Logout</button>
               <Tag color={"green"}><h2>你好，{props.datapack.loginState}</h2></Tag>
               <Tag color={"blue"}><h2>id: {props.datapack.userId}</h2></Tag>
               <Tag color={"pink"}><h2>key: {props.datapack.userPassword}</h2></Tag>
           </Header>
       </Layout>
       <Routes>
           <Route exact={true} path={"/"} element={<Home datapack={props.datapack}/>}></Route>
           <Route exact={false} path={"/signup"} element={<Signup/>}></Route>
       </Routes>
   </div>
)
}