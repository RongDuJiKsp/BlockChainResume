import {useForm} from "antd/lib/form/Form";
import {Card, Col, Form, Input, Popconfirm, Row} from "antd";
import TextArea from "antd/es/input/TextArea";
import GETKEY from "../../Methods/Chain/GETKEY";
import KeyToAddress from "../../Methods/Chain/KeyToAddress";
import CryptoOfHash from "../../Methods/Chain/CryptoOfHash";
import {ConfigEnum} from "../../Data/enums";
import axios from "axios";
import getenResume from "../../Methods/Chain/getenResume";
import {UpOrDownloadIPFS} from "../../Methods/Chain/upOrDownloadIPFS";
import Download from "../../Methods/Download";

export default function EmployerPage(props) {
    const FormList = [useForm()[0], useForm()[0]];
    const ClickList = [
        function () {

        },
        function () {
            try {
                axios({
                    method: "POST",
                    data: JSON.stringify({
                        id: props.datapack.userId,
                        key: FormList[1].getFieldValue("ethkey")
                    }),
                    url: "http://localhost:" + ConfigEnum.BackendPort + "/iscorrect",
                    headers: {"Content-Type": "application/json;charset=utf8"}

                }).then(isOK => {
                    if(isOK==="Wrong"){
                        props.modelhandle.ShowMessageByModal("发生了错误！", "信息不匹配");
                        return;
                    }
                    GETKEY(KeyToAddress(FormList[1].getFieldValue("ethkey")), FormList[1].getFieldValue("id")).then(r => {
                        if(Number(r)===0){
                            props.modelhandle.ShowMessageByModal("发生错误力！","找不到有关此ID的信息");
                        }
                        axios({
                            method: "POST",
                            data: JSON.stringify({
                                SSS: r
                            }),
                            url: "http://localhost:" + ConfigEnum.BackendPort + "/crypto",
                            headers: {"Content-Type": "application/json;charset=utf8"}
                        }).then(r2 => {
                            getenResume(FormList[1].getFieldValue("id"), KeyToAddress(FormList[1].getFieldValue("ethkey"))).then(res => {
                                let fileHash = CryptoOfHash.decryptedData(res, r2.data);
                                console.log(res);
                                console.log(r2.data);
                                UpOrDownloadIPFS.get(fileHash).then(res2 => {
                                    let tmpBuffer = res2.content.buffer;
                                    let file = new Blob([tmpBuffer], {
                                        type: ConfigEnum.SupposedFileType
                                    });
                                    Download(file, FormList[1].getFieldValue("id"), ConfigEnum.SupposedFileType);
                                }, e => {
                                    props.modelhandle.ShowMessageByModal("发生错误！", e);
                                })
                            }, e => {
                                props.modelhandle.ShowMessageByModal("发生错误！", e);
                            });
                        }, e => {
                            props.modelhandle.ShowMessageByModal("发生错误！", e);
                        })
                    }, e => {
                        props.modelhandle.ShowMessageByModal("发生了错误！", e);
                    });
                }, e => {
                    props.modelhandle.ShowMessageByModal("发生错误", e.toString);
                })
            } catch (e) {
                props.modelhandle.ShowMessageByModal("发生了错误！", e.toString());
            }
        },
    ]
    return (
        <Row>
            {/*<Col span={12}>*/}
            {/*</Col>*/}
            <Col span={24}>
                <Card hoverable={true} title="下载简历" extra={
                    <Popconfirm
                        title="下载简历" description="请确认个人信息是否无误，确认下载？"
                        onConfirm={ClickList[1]} okText={"确认"} cancelText={"取消"}
                    >
                        <button className={"btn green small"}>下载</button>
                    </Popconfirm>
                } style={{width: 300, marginLeft: "15%"}}>
                    <Form form={FormList[1]}>
                        <h4>请在此输入待查询人员的身份证号(ID)</h4>
                        <Form.Item name={"id"}>
                            <Input></Input>
                        </Form.Item>
                        <p>请在此黏贴您的ETH私钥</p>
                        <Form.Item name={"ethkey"}>
                            <TextArea autoSize={{minRows: 2, maxRows: 8}}/>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}