import Login from "./Components/Login";
import ProjectRouter from "./Components/ProjectRouter"
import { useState} from "react";
import {useNavigate} from "react-router-dom";
import "./App.css"
import {LoginStateEnum} from "./CheckMethod/enums";

export default function App() {
    const [loginState, setLoginState] = useState(LoginStateEnum.none);
    const jump=useNavigate();
    const logoutfunc = () => {
        setLoginState(LoginStateEnum.none);
        setUserId("");
        setPassword("");
        jump("/");
    }

    const [userId, setUserId] = useState("");
    const [userPassword, setPassword] = useState("");

    return loginState === LoginStateEnum.none ? <Login methodpack={{
        setLoginState: setLoginState,
        setUserId: setUserId,
        setPassword: setPassword,
        StEnum: LoginStateEnum,
    }}/> : <ProjectRouter datapack={{
        loginState: loginState,
        userId: userId,
        userPassword: userPassword,
        StEnum: LoginStateEnum,
        logoutfunc:logoutfunc,
    }}/>

}