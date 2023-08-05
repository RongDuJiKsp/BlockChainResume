import {Card, Col, Form, Input, Popconfirm, Row} from "antd";
import TextArea from "antd/es/input/TextArea";
import {useForm} from "antd/lib/form/Form";
import "../../ModelCSS/Button.css"
import Dragger from "antd/es/upload/Dragger";
import {InboxOutlined} from "@ant-design/icons";
import Download from "../../Methods/Download";
import {UpOrDownloadIPFS} from "../../Methods/Chain/upOrDownloadIPFS";
import {useState} from "react";
import {ConfigEnum} from "../../Data/enums";
import axios from "axios";
import CryptoOfHash from "../../Methods/Chain/CryptoOfHash";

export default function EmployeePage(props) {
    const FormList = [useForm()[0], useForm()[0], useForm()[0]];
    const [nowFileIPFS, setNowFileIPFS] = useState("");
    const ClickList = [
        function () {
            let ethkey = FormList[0].getFieldValue("ethkey");
            let s = FormList[0].getFieldValue("s");
            if (nowFileIPFS === "" || ethkey === "" || s === "") {
                props.modelhandle.ShowMessageByModal("错误发生了", "内容没有填写完整！");
                return;
            }
            axios({
                method: "POST",
                data: JSON.stringify({
                    id: props.datapack.userId
                }),
                url: "http://localhost:" + ConfigEnum.BackendPort + "/getkey",
                headers: {"Content-Type": "application/json;charset=utf8"}
            }).then(r => {
                if (r.data !== CryptoOfHash.encryptedData(ethkey, s)) {
                    props.modelhandle.ShowMessageByModal("错误发生了", "输入的信息有误！");
                }
                let data = {
                    id: props.datapack.userId,
                    hash: nowFileIPFS,
                    ethkey: ethkey,
                    s: s
                }
                props.modelhandle.ShowMessageByModal("上传文件中", "请稍后...");
                console.log(JSON.stringify(data));
                axios({
                    method: "post",
                    url: "http://localhost:" + ConfigEnum.BackendPort + "/delieve",
                    data: JSON.stringify(data),
                    headers: {"Content-Type": "application/json;charset=utf8"}
                }).then(r => {
                    props.modelhandle.ShowMessageByModal("提交成功！", "请耐心等待CA的审核");
                }, e => {
                    props.modelhandle.ShowMessageByModal("发生错误", e.toString());
                })
            }, e => {
                props.modelhandle.ShowMessageByModal("错误发生了", e.toString());
            })
        }, function () {
            // let file = FormList[1].getFieldValue("ipfs");
        }, function () {
            props.modelhandle.ShowMessageByModal("下载开始", "不要重复点击下载！");
            let data = {
                id: props.datapack.userId
            }
            axios({
                method: "POST",
                url: "http://localhost:" + ConfigEnum.BackendPort + "/find",
                data: JSON.stringify(data),
                headers: {"Content-Type": "application/json;charset=utf8"}
            }).then(r => {
                if (r.data === "NULL") {
                    props.modelhandle.ShowMessageByModal("没有检测到你的简历！", "请确认简历是否已经上传")
                } else {
                    UpOrDownloadIPFS.get(r.data).then(r => {
                        let tmpBuffer = r.content.buffer;
                        let file = new Blob([tmpBuffer], {
                            type: ConfigEnum.SupposedFileType
                        });
                        Download(file, props.datapack.userId, ConfigEnum.SupposedFileType);
                        props.modelhandle.ShowMessageByModal("下载成功", "请在下载栏查收简历");
                    })
                }
            }, e => {
                props.modelhandle.ShowMessageByModal("发生错误！", e.toString());
            })
        },
    ]
    return (
        <Row>
            <Col span={8}>
                <Card hoverable={true} title="上传简历" extra={
                    <Popconfirm
                        title="上传简历" description="请确认个人信息是否无误，确认上传？"
                        onConfirm={ClickList[0]} okText={"确认"} cancelText={"取消"}
                    >
                        <button className={"btn green small"}>上传简历</button>
                    </Popconfirm>
                } style={{width: 300, marginLeft: "5px"}}>
                    <Form form={FormList[0]}>
                        <Form.Item name={"ipfs"}>
                            <Dragger accept=".pdf" maxCount={1} valuePropName="fileList" beforeUpload={() => {
                                return false;
                            }} onChange={(info) => {
                                if (info.fileList.length === 0) return;
                                props.modelhandle.ShowMessageByModal("文件上传中", "请耐心等待");
                                const filereader = new FileReader();
                                filereader.readAsArrayBuffer(info.file);
                                filereader.onload = () => {
                                    UpOrDownloadIPFS.add(Buffer.from(filereader.result)).then(r => {
                                        setNowFileIPFS(r);
                                        props.modelhandle.ShowMessageByModal("文件上传成功！", "请确认信息无误后点击提交");
                                    },e=>{
                                        props.modelhandle.ShowMessageByModal("文件上传失败！", "可能是网络出问题了"+e.toString());
                                    });
                                };

                            }}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined/>
                                </p>
                                <p className="ant-upload-text">点击或拖入pdf格式文件</p>
                            </Dragger>
                        </Form.Item>
                        <p>请在此黏贴您的ETH私钥</p>
                        <Form.Item name={"ethkey"}>
                            <TextArea autoSize={{minRows: 2, maxRows: 8}}/>
                        </Form.Item>
                        <p>请在此黏贴您的s</p>
                        <Form.Item name={"s"}>
                            <TextArea autoSize={{minRows: 2, maxRows: 8}}/>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
            <Col span={8}>
                <Card hoverable={true} title="简历授权" extra={
                    <Popconfirm
                        title="授权公司" description="请确认个人信息是否无误以及公司是否可信？"
                        onConfirm={ClickList[1]} okText={"确认"} cancelText={"取消"}
                    >
                        <button className={"btn green small"}>确认并授权简历</button>
                    </Popconfirm>
                } style={{width: 300, marginLeft: "5px"}}>
                    <Form form={FormList[1]}>
                        <p>请在此黏贴所授权的公司id</p>
                        <Form.Item name={"cid"}>
                            <Input/>
                        </Form.Item>
                        <p>请在此黏贴您的ETH私钥</p>
                        <Form.Item name={"ethKey"}>
                            <TextArea autoSize={{minRows: 2, maxRows: 8}}/>
                        </Form.Item>
                        <p>请在此黏贴您的s</p>
                        <Form.Item name={"s"}>
                            <TextArea autoSize={{minRows: 2, maxRows: 8}}/>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
            <Col span={8}>
                <Card hoverable={true} title="查看简历" extra={
                    <button className={"btn green small"} onClick={ClickList[2]}>按下按钮下载简历</button>
                } style={{width: 300, marginLeft: "5px"}}>
                    <Form form={FormList[2]}>
                        <p>请在此黏贴您的ETH私钥</p>
                        <Form.Item name={"ethKey"}>
                            <TextArea autoSize={{minRows: 2, maxRows: 8}}/>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}