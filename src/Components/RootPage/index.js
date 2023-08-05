import {Card, Col, Row} from "antd";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import {ConfigEnum} from "../../Data/enums";
import Download from "../../Methods/Download";

export default function RootPage(props) {
    const Jump = useNavigate();
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
                            Jump("/root?key=" + ethKey);
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
                            }catch (e) {
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