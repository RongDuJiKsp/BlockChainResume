import {Card, Col, Row} from "antd";
import {useState} from "react";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import {ConfigEnum} from "../../Data/enums";
import Download from "../../Methods/Download";
import uploadsonkey from "../../Methods/Chain/uploadsonkey";
import KeyToAddress from "../../Methods/Chain/KeyToAddress";
import StatusManager from "../../Methods/StatusManager";

export default function RootPage(props) {
    const [ethKey, setETHKey] = useState("");
    const [keyData, setKeyData] = useState("");
    return (
        <div id={"RootWindowBox"}>
            <Row>
                <Col span={8}>
                    <Card hoverable={true} title="跳转到验证页面" extra={
                        <button className={"btn green small"} onClick={() => {
                            if (ethKey === "") {
                                props.modelhandle.messageApi.open({
                                    type: "error",
                                    content: "请填写ETH私钥！"
                                }).then()
                                return;
                            }
                            props.modelhandle.ShowMessageByModal("正在跳转。。。", "请稍等...")
                            axios({
                                method: "POST",
                                data: JSON.stringify({
                                    id: props.datapack.userId,
                                    key: ethKey
                                }),
                                url: "http://localhost:" + ConfigEnum.BackendPort + "/iscorrect",
                                headers: {"Content-Type": "application/json;charset=utf8"}
                            }).then(r => {
                                if (r.data === "Wrong") {
                                    props.modelhandle.ShowMessageByModal("发生错误", "id和ETH秘钥不对应");
                                    return;
                                }
                                props.datapack.Jump("/root");
                                props.modelhandle.setModelVisible(false);
                                StatusManager.ChangeStateOfArray(props.datapack.setUserTmpValues,0,ethKey);
                            }, e => {
                                props.modelhandle.ShowMessageByModal("发生错误", e.toString());
                            })

                        }}>跳转</button>
                    } style={{width: 300, marginLeft: "15%"}}>
                        <p>请在此黏贴您的ETH私钥</p>
                        <TextArea autoSize={{minRows: 2, maxRows: 8}} onChange={e => setETHKey(e.target.value)}/>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card hoverable={true} title="提交所拥有的份额" extra={
                        <button className={"btn blue small"} onClick={() => {
                            try {
                                let obj = JSON.parse(keyData);
                                console.log(obj);
                                let ids = Object.keys(obj);
                                ids.map(r=>{
                                    uploadsonkey(KeyToAddress(ethKey),obj[r][0],obj[r][1],obj[r][2],r).then(r=>{console.log(r);},e=>{console.error(e)})
                                    return r;
                                })
                                // console.log(obj, ids);
                                // uploadsonkey(KeyToAddress(ethKey), obj[ids[0]][0], obj[ids[0]][1], obj[ids[0]][2], ids[0]).then(r => console.log(r), e => console.log(e));
                            } catch (e) {
                                props.modelhandle.messageApi.open({
                                    type: "error",
                                    content: e.toString()
                                }).then()
                            }
                        }}>提交</button>
                    } style={{width: 300, marginLeft: "15%"}}>
                        <p>请以 "id":"份额组"的方式提交，如 <br/> " id":["num1","num2","num3"] <br/> 如有多个，请用英文逗号分割
                        </p>
                        <TextArea autoSize={{minRows: 2, maxRows: 8}}
                                  onChange={e => setKeyData("{" + e.target.value + "}")}/>
                        <p>请在此黏贴您的ETH私钥</p>
                        <TextArea autoSize={{minRows: 2, maxRows: 8}} onChange={e => setETHKey(e.target.value)}/>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card hoverable={true} title="获取份额" extra={
                        <button className={"btn purple small"} onClick={() => {
                            props.modelhandle.ShowMessageByModal("下载已经开始！", "请检查下载框。。。");
                            axios({
                                method: "post",
                                url: "http://localhost:" + ConfigEnum.BackendPort + "/download",
                                headers: {"Content-Type": "application/json;charset=utf8"},
                                data: JSON.stringify({
                                    id: props.datapack.userId
                                })
                            }).then(r => {
                                let strData = JSON.stringify(r.data)
                                if (strData === "{}") {
                                    props.modelhandle.ShowMessageByModal("发生错误！", "下载" + props.datapack.userId + "的时候下载次数已经用尽。。");
                                    return;
                                }
                                let blob = new Blob([strData], {
                                    type: 'text/plain'
                                });
                                Download(blob, props.datapack.userId + "的部分份额", "text/key");
                            }, e => {
                                props.modelhandle.ShowMessageByModal("发生错误", e.toString());
                            })

                        }}>获取</button>
                    } style={{width: 300, marginLeft: "15%"}}>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}