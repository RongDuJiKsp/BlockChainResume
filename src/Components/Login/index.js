import {useNavigate} from "react-router-dom";

import "./index.css"
import "../../ModelCSS/Button.css"
import {Form, Input, Radio} from "antd";
import {useForm} from "antd/lib/form/Form";
import {useState} from "react";
import {ConfigEnum, LoginStateEnum} from "../../Data/enums";
import axios from "axios";

export default function Login(props) {
    const [form] = useForm();
    const jump = useNavigate();
    const [loginIdentify, setLoginIdentify] = useState(LoginStateEnum.root);
    const submit = () => {
        props.modelhandle.ShowMessageByModal("登录中....", "请稍后。。。");
        let data = {
            idin: form.getFieldValue("userid"),
            passwordin: form.getFieldValue("userpassword")
        }
        axios({
            method: "post",
            data: JSON.stringify(data),
            url: "http://localhost:" + ConfigEnum.BackendPort + "/signin",
            headers: {"Content-Type": "application/json;charset=utf8"}
        }).then(r => {
            if (r.data === "True") {
                props.modelhandle.setModelVisible(false);
                props.methodpack.setUserId(data.idin);
                props.methodpack.setPassword(data.passwordin);
                props.methodpack.setLoginState(loginIdentify);
                jump("/");
            } else {
                props.modelhandle.ShowMessageByModal("验证错误", r.data);
            }
        }, e => {
            props.modelhandle.ShowMessageByModal("发生错误了", e.toString());
        })
    }
    const signup = () => {
        props.methodpack.setLoginState(LoginStateEnum.register);
        jump("/signup");
    }
    return (
        <div id={"LoginMainWindow"}>
            <img src={require("./logo.png")} alt={"null"} draggable={false}/>
            <Radio.Group style={{marginTop: 10, marginBottom: 20}}
                         defaultValue={LoginStateEnum.root}
                         onChange={(e) => {
                             setLoginIdentify(e.target.value)
                         }}
            >
                <Radio.Button value={LoginStateEnum.root}>
                    以Root身份登录
                </Radio.Button>
                <Radio.Button value={LoginStateEnum.employer}>
                    以雇主身份登录
                </Radio.Button>
                <Radio.Button value={LoginStateEnum.employee}>
                    以雇员身份登录
                </Radio.Button>
            </Radio.Group>
            <Form form={form}>
                <Form.Item name={"userid"} label={"身份ID"}>
                    <Input/>
                </Form.Item>
                <Form.Item name={"userpassword"} label={"验证密码"}>
                    <Input.Password/>
                </Form.Item>
            </Form>
            <button className={"btn green"} onClick={submit}>Sign in</button>
            <button className={"btn blue"} onClick={signup}>Sign up</button>
        </div>
    )
}