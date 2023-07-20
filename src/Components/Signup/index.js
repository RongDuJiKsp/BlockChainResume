import {Content} from "antd/es/layout/layout";

import "./index.css"
import "../../ModelCSS/Button.css"
import {Button, Form, Result, Steps} from "antd";
import {
    LikeOutlined,
    LoadingOutlined,
    SelectOutlined,
    SmileOutlined,
    SolutionOutlined,
    UserOutlined
} from "@ant-design/icons";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "antd/lib/form/Form";
import TextArea from "antd/es/input/TextArea";
import {ConfigEnum, ValidateStatusEnum} from "../../CheckMethod/enums";
import CheckObj from "../../CheckMethod/CheckObj";

export default function Signup(props) {
    const [form] = useForm()
    const [finishStatus, setFinishStatus] = useState(0);
    const [helpStatus,setHelpStatus]=useState("")
    const [tmpUpUserId, setTmpUpUserId] = useState("");
    const [tmpUpUserPassword, setTmpUpUserPassword] = useState("");
    const [tmpUpUserKey, setTmpUpUserKey] = useState("");
    const [validateStatus, setValidateStatus] = useState(ValidateStatusEnum.success);
    const MappingStatus = (now, my) => {
        if (now > my) return "finish";
        else if (now === my) return "process"
        else return "wait";
    }
    const SuccessTitle="你的ID为 " +tmpUpUserId+
        " 你的密码为" +tmpUpUserPassword+
        " 请确认输入是否正确并截图！！！" +
        " 上链之后无法更改！  如有误请Logout重新注册！"
    const SubmitTrain=()=>{

    }
    const Jump = useNavigate();
    const Submit = [{
        LastItemNumber: 3,

        tips: "身份证号码",
        inputHolder: "身份证号",
        help: "请输入标准的身份证号码",
        type: "text",
        func: () => {
            //这里进行身份证的合法校验
            if (tmpUpUserId===""||!CheckObj.identity_card.test(tmpUpUserId)) {
                setValidateStatus(ValidateStatusEnum.error);
                setHelpStatus("请检查身份证号码是否合法！");
                return;
            }
            setValidateStatus(ValidateStatusEnum.success);
            setHelpStatus("");
            setFinishStatus(1);
            form.setFieldValue("id", "");
        },
        submit: (event) => {
            setTmpUpUserId(event.target.value);
        },
    }, {
        tips: "密码",
        inputHolder: "Password",
        help: "输入密码",
        type: "text",
        func: () => {
            //这里进行密码的合法校验
            if (tmpUpUserPassword.length<ConfigEnum.MinPasswordLength) {
                setValidateStatus(ValidateStatusEnum.error);
                setHelpStatus("密码不得小于6位！");
                return;
            }
            setValidateStatus(ValidateStatusEnum.success);
            setHelpStatus("");
            setFinishStatus(2);
            form.setFieldValue("id", "");
        },
        submit: (event) => {
            setTmpUpUserPassword(event.target.value);
        },
    }, {
        tips: "秘钥",
        inputHolder: "Key",
        help: "请将公钥复制于此",
        type: "text",
        func: () => {
            //这里进行秘钥的合法校验
            if (tmpUpUserKey==="") {
                setValidateStatus(ValidateStatusEnum.error);
                setHelpStatus("秘钥不得为空！");
                return;
            }
            setValidateStatus(ValidateStatusEnum.success);
            setHelpStatus("");
            setFinishStatus(3);
            form.setFieldValue("id", "");
        },
        submit: (event) => {
            setTmpUpUserKey(event.target.value);
        },
    }, {
        func: () => {
            SubmitTrain();
           setFinishStatus(4);
        },
        rand: () => {
            return (
                <Result
                    status="warning"
                    title="注册即将成功！"
                    subTitle={SuccessTitle}
                    extra={[
                        <Button type="primary" key="console" onClick={Submit[3].func}>
                            确认上链
                        </Button>,
                    ]}
                />
            )
        }
    }, {
        func: () => {
            props.datapack.logoutfunc();
            Jump("/");
        },
        rand: () => {
            return (
                <Result
                    status="success"
                    title="注册成功！"
                    subTitle={"注册成功"}
                    extra={[
                        <Button type="primary" key="console" onClick={Submit[4].func}>
                            返回登录页面
                        </Button>,
                    ]}
                />
            )
        }
    }]
    const PageRanter = (state) => {
        if (state< Submit[0].LastItemNumber) return (
            <div style={{marginLeft: "33.3%"}}>
                <div className={"SignupInp"}>
                    <h1>{Submit[state].tips}</h1>
                    <Form form={form}>
                        <Form.Item name={"id"} validateStatus={validateStatus} help={helpStatus}>
                            <TextArea allowClear placeholder={Submit[state].inputHolder} onChange={Submit[state].submit}
                                      autoSize={{minRows: 1, maxRows: 5}}/>
                        </Form.Item>
                    </Form>
                    <button style={{marginLeft: "41%"}} className={"btn purple"}
                            onClick={Submit[finishStatus].func}>Next
                    </button>
                </div>
            </div>
        )
        else return Submit[state].rand();
    }
    return (
        <Content style={{height: "700px"}} className={"SignupWindow"}>
            <div style={{marginLeft: "90px", marginRight: "90px"}}>
                <Steps items={[
                    {
                        title: '身份证验证',
                        description: "提供身份证作为唯一ID",
                        status: MappingStatus(finishStatus, 0),
                        icon: MappingStatus(finishStatus, 0) === "process" ? <LoadingOutlined/> : <UserOutlined/>
                    },
                    {
                        title: '设置密码',
                        description: "设置用于登录的密码",
                        status: MappingStatus(finishStatus, 1),
                        icon: MappingStatus(finishStatus, 1) === "process" ? <LoadingOutlined/> : <SelectOutlined/>
                    },
                    {
                        title: '秘钥验证',
                        description: "提供唯一秘钥的公钥",
                        status: MappingStatus(finishStatus, 2),
                        icon: MappingStatus(finishStatus, 2) === "process" ? <LoadingOutlined/> : <SolutionOutlined/>
                    },
                    {
                        title: '最终确认',
                        description: "确认输入是否正确",
                        status: MappingStatus(finishStatus, 3),
                        icon: MappingStatus(finishStatus, 3) === "process" ? <LoadingOutlined/> : <SmileOutlined/>
                    },
                    {
                        title: '完成',
                        description: "",
                        status: MappingStatus(finishStatus, 4),
                        icon: <LikeOutlined />
                    },

                ]} style={{marginTop: "50px"}}></Steps>
                {PageRanter(finishStatus)}
            </div>
        </Content>
    )
}