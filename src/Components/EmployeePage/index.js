import {Card, Col, Form, Input, Popconfirm, Row} from "antd";
import TextArea from "antd/es/input/TextArea";
import {useForm} from "antd/lib/form/Form";
import "../../ModelCSS/Button.css"
import Dragger from "antd/es/upload/Dragger";
import {InboxOutlined} from "@ant-design/icons";
import Download from "../../Methods/Download";
import {upordownloadIPFS} from "../../Methods/upordownloadIPFS";
import {useState} from "react";
import {ConfigEnum} from "../../Data/enums";
import axios from "axios";

export default function EmployeePage(props) {
    const FormList = [useForm()[0], useForm()[0], useForm()[0]];
    const [nowFileIPFS, setNowFileIPFS] = useState("");
    const ClickList = [
        function () {
            let data = {
                id: props.datapack.userId,
                hash: nowFileIPFS
            }
            props.modelhandle.ShowMessageByModal("上传文件中", "请稍后...");
            axios({
                method: "post",
                url: "http://localhost:" + ConfigEnum.BackendPort + "/delieve",
                data: JSON.stringify(data),
                headers: {"Content-Type": "application/json;charset=utf8"}
            }).then(r => {
                props.modelhandle.ShowMessageByModal("提交成功！",r.data);
            }, e => {
                props.modelhandle.ShowMessageByModal("发生错误",e.toString());
            })
        }, function () {
            // let file = FormList[1].getFieldValue("ipfs");
        }, function () {
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
                    alert("未上传简历！");
                } else {
                    upordownloadIPFS.get(r.data).then(r => {
                        let tmpBuffer = r.content.buffer;
                        let file = new Blob([tmpBuffer], {
                            type: ConfigEnum.SupposedFileType
                        });
                        Download(file, props.datapack.userId, ConfigEnum.SupposedFileType);
                    })
                }
            }, e => {
                console.log(e);
                alert(e.toString());
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
                            <Dragger valuePropName="fileList" beforeUpload={() => {
                                return false;
                            }} onChange={(info) => {
                                console.log(info.file);
                                const filereader = new FileReader();
                                filereader.readAsArrayBuffer(info.file);
                                filereader.onload = () => {
                                    upordownloadIPFS.add(Buffer.from(filereader.result)).then(r => {
                                        console.log("file ipfs is" + r);
                                        setNowFileIPFS(r);
                                    });
                                };

                            }}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined/>
                                </p>
                                <p className="ant-upload-text">点击或拖入文件</p>
                            </Dragger>
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