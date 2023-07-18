import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Input} from "antd";

import "./index.css"
import "../../ModelCSS/Button.css"

export default function Login(props) {
    const [tmpUserId, setTmpUserId] = useState("");
    const [tmpUserPassword, setTmpUserPassword] = useState("");
    const jump = useNavigate();
    const submit = () => {
        console.log(tmpUserId, tmpUserPassword)
        props.methodpack.setUserId(tmpUserId);
        props.methodpack.setPassword(tmpUserPassword);
        props.methodpack.setLoginState(props.methodpack.StEnum.root);
    }
    const signup = () => {
        props.methodpack.setLoginState(props.methodpack.StEnum.register);
        jump("/signup");
    }
    return (
        <div id={"LoginMainWindow"}>
            <h2>Login</h2>
            <Input onChange={event => setTmpUserId(event.target.value)} rootClassName={"LoginInput"}></Input>
            <Input.Password onChange={event => setTmpUserPassword(event.target.value)}
                            rootClassName={"LoginInput"}></Input.Password>
            <button className={"btn green"} onClick={submit}>Sign in</button>
            <button className={"btn blue"} onClick={signup}>Sign up</button>
        </div>
    )
}