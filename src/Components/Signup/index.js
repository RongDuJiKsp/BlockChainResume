import {Content} from "antd/es/layout/layout";
import "./index.css"
import "../../ModelCSS/Button.css"
import {Button, Form, Input, Result, Steps} from "antd";
import {
    LikeOutlined,
    LoadingOutlined,
    SelectOutlined,
    SmileOutlined,
    UserOutlined
} from "@ant-design/icons";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "antd/lib/form/Form";
import {ConfigEnum, ETHKeyEnum, ValidateStatusEnum} from "../../Data/enums";
import CheckObj from "../../Methods/CheckObj";
import axios from "axios";


export default function Signup(props) {
    const [form] = useForm()
    const [finishStatus, setFinishStatus] = useState(0);
    const [helpStatus, setHelpStatus] = useState("")
    const [tmpUpUserId, setTmpUpUserId] = useState("");
    const [tmpUpUserPassword, setTmpUpUserPassword] = useState("");
    const [tmpUpUserPasswordC, setTmpUpUserPasswordC] = useState("");
    const [tmpUpUserRandomKey, setTmpUpUserRandomKey] = useState("");
    const [validateStatus, setValidateStatus] = useState(ValidateStatusEnum.success);
    const [loadings, setLoadings] = useState([false, false]);
    const MappingStatus = (now, my) => {
        if (now > my) return "finish";
        else if (now === my) return "process"
        else return "wait";
    }
    const inConform = "请牢记程序给出的秘钥和ETH秘钥";
    const SubmitServer = () => {
        let data = {
            idup: tmpUpUserId,
            passwordup: tmpUpUserPassword,
            s: tmpUpUserRandomKey
        }
        console.log(JSON.stringify(data))
        axios({
            method: "post",
            url: "http://localhost:" + ConfigEnum.BackendPort + "/signup",
            data: JSON.stringify(data),
            headers: {"Content-Type": "application/json;charset=utf8"}
        }).then(r => {
            console.log(r);
            if (r.status === 200 && r.data === "True") setFinishStatus(e => {
                return e + 1
            })
            else {
                form.setFieldValue("help", "提交失败，请重新点击提交按钮 错误为：" + r.data)
                setLoadings(pre => {
                    let tmp = [...pre];
                    tmp[0] = false;
                    return tmp
                })
            }
        }, e => {
            form.setFieldValue("help", "提交失败，请重新点击提交按钮 错误为：" + e.toString())
            setLoadings(pre => {
                let tmp = [...pre];
                tmp[0] = false;
                return tmp
            })
        })
    }
    const ShowFinalData = () => {
        form.setFieldValue("cid", "你的id是 : " + tmpUpUserId);
        form.setFieldValue("help", inConform);
        form.setFieldValue("ethkey", ETHKeyEnum.getKey());
    }
    const SubmitFresh = () => {
        axios.get("http://localhost:" + ConfigEnum.BackendPort + "/random1").then(r => {
            if (r.status === 200) {
                console.log(r.data);
                form.setFieldValue("s", r.data["randomnumber"]);
                setTmpUpUserRandomKey(r.data["randomnumber"]);
                setLoadings(pre => {
                    let tmp = [...pre];
                    tmp[1] = false;
                    return tmp
                })
            }
        }, e => {
            form.setFieldValue("s", "发生错误，错误为 " + e.toString());
            setLoadings(pre => {
                let tmp = [...pre];
                tmp[1] = false;
                return tmp
            })
        })
    }
    const Jump = useNavigate();
    const Submit = [{
        LastItemNumber: 3,

        tips: "身份证号码",
        inputHolder: "身份证号",
        help: "请输入标准的身份证号码",
        func: () => {
            //这里进行身份证的合法校验
            if (tmpUpUserId === "" || !CheckObj.identity_card.test(tmpUpUserId)) {
                setValidateStatus(ValidateStatusEnum.error);
                setHelpStatus("请检查身份证号码是否合法！");
                return;
            }
            setValidateStatus(ValidateStatusEnum.success);
            setHelpStatus("");
            setFinishStatus(finishStatus + 1);
        },
        submit: (event) => {
            setTmpUpUserId(event.target.value);
        },
        rand() {
            return (
                <Form.Item name={"id"} validateStatus={validateStatus} help={helpStatus}>
                    <Input allowClear placeholder={this.inputHolder} onChange={this.submit}/>
                </Form.Item>
            )
        }
    }, {
        tips: "密码",
        inputHolder: "Password",
        inputHolderC: "Confirm Password",
        help: "设置密码",
        func: () => {
            //这里进行密码的合法校验
            if (tmpUpUserPassword.length < ConfigEnum.MinPasswordLength) {
                setValidateStatus(ValidateStatusEnum.error);
                setHelpStatus("密码不得小于6位！");
                return;
            }
            if (tmpUpUserPassword !== tmpUpUserPasswordC) {
                setValidateStatus(ValidateStatusEnum.error);
                setHelpStatus("两次输入的密码不一致！");
                return;
            }
            setValidateStatus(ValidateStatusEnum.success);
            setHelpStatus("");
            setFinishStatus(finishStatus + 1);
            ShowFinalData();
            SubmitFresh();
        },
        submit: (event) => {
            setTmpUpUserPassword(event.target.value);
        },
        submitC: (e) => {
            setTmpUpUserPasswordC(e.target.value);
        },
        rand() {
            return (
                <>
                    <Form.Item name={"password"} validateStatus={validateStatus} help={helpStatus}>
                        <Input.Password allowClear placeholder={this.inputHolder} onChange={this.submit}/>
                    </Form.Item>
                    <Form.Item name={"passwordc"} validateStatus={validateStatus} help={helpStatus}>
                        <Input.Password allowClear placeholder={this.inputHolderC} onChange={this.submitC}/>
                    </Form.Item>

                </>
            )
        }
    }, {
        fresh: () => {
            setLoadings(pre => {
                let tmp = [...pre];
                tmp[1] = true;
                return tmp
            })
            SubmitFresh();
        },
        func: () => {
            setLoadings(pre => {
                let tmp = [...pre];
                tmp[0] = true;
                return tmp
            })
            SubmitServer();
        },
        rand: () => {
            return (
                <>
                    <Button style={{marginBottom: 10}} onClick={Submit[finishStatus].fresh}
                            loading={loadings[1]}>点击刷新</Button>
                    <Form.Item name="cid">
                        <Input readOnly/>
                    </Form.Item>
                    <Form.Item name="help">
                        <Input.TextArea readOnly autoSize={{minRows: 2, maxRows: 6}}/>
                    </Form.Item>
                    <Form.Item name="s">
                        <Input.TextArea readOnly autoSize={{minRows: 2, maxRows: 6}}/>
                    </Form.Item>
                    <Form.Item name="ethkey">
                        <Input.TextArea readOnly autoSize={{minRows: 2, maxRows: 6}}/>
                    </Form.Item>
                </>
            )
        }
    }, {
        func: () => {
            Jump("/");
            props.datapack.logoutfunc();
        },
        rand: () => {
            return (
                <Result
                    status="success"
                    title="注册成功！"
                    subTitle={"注册成功"}
                    extra={[
                        <Button type="primary" key="console" onClick={Submit[finishStatus].func}>
                            返回登录页面
                        </Button>,
                    ]}
                />
            )
        }
    }]
    const PageRanter = (state) => {
        if (state < Submit[0].LastItemNumber) return (
            <div style={{marginLeft: "33.3%"}}>
                <div className={"SignupInp"}>
                    <h1>{Submit[state].tips}</h1>
                    <Form form={form}>
                        {Submit[state].rand()}
                    </Form>
                    <Button type="primary" style={{marginLeft: "40%"}} onClick={Submit[finishStatus].func}
                            loading={loadings[0]}>next</Button>
                </div>
            </div>
        )
        else return Submit[state].rand();
    }
    return (
        <>
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
                            title: '获取数据',
                            description: "确认输入并且分配秘钥",
                            status: MappingStatus(finishStatus, 2),
                            icon: MappingStatus(finishStatus, 2) === "process" ? <LoadingOutlined/> : <SmileOutlined/>
                        },
                        {
                            title: '完成',
                            description: "",
                            status: MappingStatus(finishStatus, 3),
                            icon: <LikeOutlined/>
                        },

                    ]} style={{marginTop: "50px"}}></Steps>
                    {PageRanter(finishStatus)}
                </div>
            </Content></>
    )
}