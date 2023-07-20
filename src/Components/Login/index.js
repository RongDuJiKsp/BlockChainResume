import {useNavigate} from "react-router-dom";

import "./index.css"
import "../../ModelCSS/Button.css"
import {Form, Input, Radio} from "antd";
import {useForm} from "antd/lib/form/Form";
import {useState} from "react";

export default function Login(props) {
    const [form] = useForm();
    const jump = useNavigate();
    const [loginIdentify, setLoginIdentify] = useState(props.methodpack.StEnum.root);
    const submit = () => {
        console.log();
        props.methodpack.setUserId(form.getFieldValue("userid"));
        props.methodpack.setPassword(form.getFieldValue("userpassword"));
        props.methodpack.setLoginState(loginIdentify);
    }
    const signup = () => {
        props.methodpack.setLoginState(props.methodpack.StEnum.register);
        jump("/signup");
    }
    return (
        <div id={"LoginMainWindow"}>
            <img src={require("./logo.png")} alt={"null"} draggable={false}/>
            <Radio.Group style={{marginTop:10,marginBottom :20}}
                         defaultValue={props.methodpack.StEnum.root}
                         onChange={(e)=>{setLoginIdentify(e.target.value)}}
            >
                <Radio.Button value={props.methodpack.StEnum.root}>
                    以Root身份登录
                </Radio.Button>
                <Radio.Button value={props.methodpack.StEnum.employer}>
                    以雇主身份登录
                </Radio.Button>
                <Radio.Button value={props.methodpack.StEnum.employee}>
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