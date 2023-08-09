import "./index.css"
import "../../ModelCSS/Button.css"
import {Form, Input, Radio} from "antd";
import {useForm} from "antd/lib/form/Form";
import {useState} from "react";
import {ConfigEnum, LoginStateEnum} from "../../Data/enums";
import axios from "axios";
import CryptoOfHash from "../../Methods/Chain/CryptoOfHash";

export default function Login(props) {
    const [form] = useForm();
    const [loginIdentify, setLoginIdentify] = useState(LoginStateEnum.root);
    const Topath = (Identify) => {
        if (Identify === LoginStateEnum.root) return "/caasignin";
        if (Identify === LoginStateEnum.employer) return "/comsignin"
        if (Identify === LoginStateEnum.employee) return "/signin";
    }
    const submit = () => {
        props.modelhandle.ShowMessageByModal("登录中....", "请稍后。。。");
        let data = {
            idin: form.getFieldValue("userid"),
            passwordin: loginIdentify === LoginStateEnum.employee ? CryptoOfHash.hashData(form.getFieldValue("userpassword")) : form.getFieldValue("userpassword")
        }
        axios({
            method: "post",
            data: JSON.stringify(data),
            url: "http://localhost:" + ConfigEnum.BackendPort + Topath(loginIdentify),
            headers: {"Content-Type": "application/json;charset=utf8"}
        }).then(r => {
            if (r.data === "True") {
                props.modelhandle.setModelVisible(false);
                props.methodpack.setUserId(data.idin);
                props.methodpack.setLoginState(loginIdentify);
                props.methodpack.Jump("");
            } else {
                props.modelhandle.ShowMessageByModal("验证错误", r.data);
            }
        }, e => {
            props.modelhandle.ShowMessageByModal("发生错误了", e);
        })
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
                    以CA身份登录
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
            <button className={"btn green small"} onClick={submit}>用户登入</button>
            <button className={"btn blue small"} onClick={() => {
                props.methodpack.setLoginState(LoginStateEnum.register);
                props.methodpack.Jump("/signup");
            }}>用户注册
            </button>
            <button className={"red btn small"} onClick={() => {
                props.methodpack.setLoginState(LoginStateEnum.finder);
                props.methodpack.Jump("/find");
            }}>找回密码
            </button>
        </div>
    )
}