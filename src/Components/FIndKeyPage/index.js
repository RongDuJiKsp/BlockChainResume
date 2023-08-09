import {Content} from "antd/es/layout/layout";
import "./index.css"
import {useState} from "react";
import {Button, Form, Input, Radio} from "antd";
import StatusManager from "../../Methods/StatusManager";
import axios from "axios";
import {ConfigEnum} from "../../Data/enums";
import CryptoOfHash from "../../Methods/Chain/CryptoOfHash";
import CheckObj from "../../Methods/CheckObj";
import GETKEY from "../../Methods/Chain/GETKEY";
import KeyToAddress from "../../Methods/Chain/KeyToAddress";
import getenResume from "../../Methods/Chain/getenResume";
import {UpOrDownloadIPFS} from "../../Methods/Chain/upOrDownloadIPFS";
import Download from "../../Methods/Download";

export default function FIndKeyPage(props) {
    const [userID, setUserID] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userS, setUserS] = useState("");
    const [userETHKey, setUserETHKey] = useState("");
    const [pageState, setPageState] = useState([0, "", true]);
    const [loadingState, setLoadingState] = useState([false, false]);
    const Finder = [
        {//第一页输入id
            render: function () {
                return (<>
                    <h2 style={{marginBottom: 40}} className={"items"}>请输入你的用户id</h2>
                    <Input onChange={(e) => {
                        setUserID(e.target.value);
                    }}></Input>
                </>)
            },
            onNext: function () {
                if (CheckObj.identity_card.test(userID) === false) {
                    props.modelhandle.ShowMessageByModal("格式错误！", "请检查身份证格式是否正确");
                    return;
                }
                StatusManager.ChangeStateOfArray(setPageState, 0, 1);
            }
        }, {//第二页选择需要找回的东西
            render: function () {
                return (
                    <>
                        <h2 style={{marginBottom: 70}}>请在此选择需要找回的东西</h2>
                        <Radio.Group  buttonStyle={"solid"} onChange={(e) => {
                            StatusManager.ChangeStateOfArray(setPageState, 1, e.target.value);
                            console.log(e);
                        }}>
                            <Radio.Button value={"password"}>账户密码</Radio.Button>
                            <Radio.Button value={"ETHKey"}>账户以太坊秘钥</Radio.Button>
                            <Radio.Button value={"s"}>账户私钥</Radio.Button>
                        </Radio.Group>
                    </>
                )
            },
            onNext: function () {
                if (pageState[1] === "password") StatusManager.ChangeStateOfArray(setPageState, 0, 2);
                if (pageState[1] === "ETHKey") StatusManager.ChangeStateOfArray(setPageState, 0, 4);
                if (pageState[1] === "s") StatusManager.ChangeStateOfArray(setPageState, 0, 5);
            }
        }, {//第三页输入相关信息找回密码
            render: function () {
                return (<>
                    <h2>请在此输入相关信息</h2>
                    <Form>
                        <Form.Item>
                            <Input.TextArea autoSize={{minRows: 2, maxRows: 8}} placeholder="请在此输入ETH秘钥"
                                            onChange={(e) => {
                                                setUserETHKey(e.target.value);
                                            }}/>
                        </Form.Item>
                        <Form.Item>
                            <Input.TextArea autoSize={{minRows: 2, maxRows: 8}} placeholder="请在此输入用户秘钥"
                                            onChange={(e) => {
                                                setUserS(e.target.value);
                                            }}/>
                        </Form.Item>
                    </Form>
                </>)
            },
            onNext: function () {
                StatusManager.ChangeStateOfArray(setLoadingState, 0, true);
                axios({
                    method: "POST",
                    data: JSON.stringify({
                        id: userID
                    }),
                    url: "http://localhost:" + ConfigEnum.BackendPort + "/getkey",
                    headers: {"Content-Type": "application/json;charset=utf8"}
                }).then(r => {
                    console.log(r);
                    StatusManager.ChangeStateOfArray(setLoadingState, 0, false);
                    let KeyS = CryptoOfHash.encryptedData(userETHKey, userS);
                    if (KeyS === r.data) {
                        StatusManager.ChangeStateOfArray(setPageState, 0, 3);
                    } else {
                        props.modelhandle.ShowMessageByModal("发生错误", "不存在的ID或者信息输入错误");
                    }
                }, e => {
                    props.modelhandle.ShowMessageByModal("发生错误", e.toString());
                    StatusManager.ChangeStateOfArray(setLoadingState, 0, false);
                })
            }
        }, {//第四页用于重新填写密码
            render: function () {
                return (<>
                    <h2>请在此重新填写密码</h2>
                    <Input onChange={(e) => {
                        setUserPassword(e.target.value);
                    }}></Input>
                </>)
            },
            onNext: function () {
                StatusManager.ChangeStateOfArray(setLoadingState, 0, true);
                axios({
                    method: "POST",
                    data: JSON.stringify({
                        id: userID,
                        password: userPassword
                    }),
                    url: "http://localhost:" + ConfigEnum.BackendPort + "/change",
                    headers: {"Content-Type": "application/json;charset=utf8"}
                }).then(r => {
                    StatusManager.ChangeStateOfArray(setLoadingState, 0, false);
                    if (r.data === "Successful") {
                        props.modelhandle.ShowMessageByModal("修改成功！", r.data + "请重新登录");
                        props.datapack.logoutfunc();
                    } else {
                        props.modelhandle.ShowMessageByModal("发生错误", r.data + ":您修改的账号不存在！");
                    }

                }, e => {
                    props.modelhandle.ShowMessageByModal("发生错误", e.toString());
                    StatusManager.ChangeStateOfArray(setLoadingState, 0, false);
                })
            }
        }, {//第五页用于找回ETHKey
            render: function () {
                return (<>
                    <h2 style={{marginBottom: 30}}>请填写好有关信息</h2>
                    <Input.TextArea autoSize={{minRows: 2, maxRows: 8}} placeholder="请在此输入用户秘钥"
                                    onChange={(e) => {
                                        setUserS(e.target.value);
                                    }}/>
                </>)
            },
            onNext: function () {
                StatusManager.ChangeStateOfArray(setLoadingState, 0, true);
                axios({
                    method: "POST",
                    data: JSON.stringify({
                        id: userID
                    }),
                    url: "http://localhost:" + ConfigEnum.BackendPort + "/getkey",
                    headers: {"Content-Type": "application/json;charset=utf8"}
                }).then(r => {
                    let ETH = CryptoOfHash.decryptedData(r.data, userS);
                    props.modelhandle.ShowMessageByModal("找回成功", "ETH秘钥为 " + ETH + " 请复制并且牢记秘钥！")
                    props.datapack.logoutfunc();
                }, e => {
                    props.modelhandle.ShowMessageByModal("发生错误", e.toString());
                    StatusManager.ChangeStateOfArray(setLoadingState, 0, false);
                })

            }
        }, {//第六页用于提交找回s的申请
            render: function () {
                return (<>
                    <h2 style={{marginBottom: 30}}>请填写好有关信息</h2>
                    <Input.TextArea autoSize={{minRows: 2, maxRows: 8}} placeholder="请在此输入ETH秘钥"
                                    onChange={(e) => {
                                        setUserETHKey(e.target.value);
                                    }}/>
                </>)
            },
            onNext: function () {
               try {
                   GETKEY(KeyToAddress(userETHKey),userID).then(r => {
                       if(Number(r)===0){
                           props.modelhandle.ShowMessageByModal("发生错误力！","找不到有关此ID的信息,或者没有提交足够的份额");
                           return;
                       }
                       axios({
                           method: "POST",
                           data: JSON.stringify({
                               SSS: r
                           }),
                           url: "http://localhost:" + ConfigEnum.BackendPort + "/crypto",
                           headers: {"Content-Type": "application/json;charset=utf8"}
                       }).then(r2 => {
                           props.modelhandle.ShowMessageByModal("请在此复制你的s！",r2);
                       }, e => {
                           props.modelhandle.ShowMessageByModal("发生错误！", e);
                       })
                   }, e => {
                       props.modelhandle.ShowMessageByModal("发生了错误！", e);
                   });
               }catch (e){
                   props.modelhandle.ShowMessageByModal("发生了错误！", e);
               }
            }
        }
    ]
    return (
        <Content style={{height: 900}} className="FindPage">
            <div id="FindMainWindow">
                <div className={"FindContextPage"}>
                    {Finder[pageState[0]].render()}
                </div>
                <Button type="primary" loading={loadingState[0]}
                        onClick={Finder[pageState[0]].onNext}>前往下一步</Button>
            </div>
        </Content>
    )
}