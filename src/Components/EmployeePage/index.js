import {Card, Col, Form, Popconfirm, Row} from "antd";
import TextArea from "antd/es/input/TextArea";
import {useForm} from "antd/lib/form/Form";
import "../../ModelCSS/Button.css"
import Dragger from "antd/es/upload/Dragger";
import {InboxOutlined} from "@ant-design/icons";
import Download from "../../Methods/Download";

export default function EmployeePage(props) {
    const cancel = () => {
    }
    const FormList = [useForm()[0], useForm()[0], useForm()[0]];
    const ClickList = [
        function () {
            let a = FormList[0].getFieldValue("ipfs");
            console.log(a);

        }, function () {
            let a = FormList[1].getFieldValue("ipfs");
            console.log(a);
        }, function () {
            const blob = new Blob(["content"], {type: 'text/plain'});
            Download(blob);
        },
    ]
    return (
        <Row>
            <Col span={8}>
                <Card hoverable={true} title="上传简历" extra={
                    <Popconfirm
                        title="上传简历" description="请确认个人信息是否无误，确认上传？"
                        onConfirm={ClickList[0]} onCancel={cancel} okText={"确认"} cancelText={"取消"}
                    >
                        <button className={"btn green small"}>上传简历</button>
                    </Popconfirm>
                } style={{width: 300, marginLeft: "5px"}}>
                    <Form form={FormList[0]}>
                        <Form.Item name={"ipfs"}>
                            <Dragger beforeUpload={() => {
                                return false;
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
                    </Form>
                </Card>
            </Col>
            <Col span={8}>
                <Card hoverable={true} title="更新简历" extra={
                    <Popconfirm
                        title="更新简历" description="请确认个人信息是否无误，确认更新？"
                        onConfirm={ClickList[1]} onCancel={cancel} okText={"确认"} cancelText={"取消"}
                    >
                        <button className={"btn green small"}>确认并更新简历</button>
                    </Popconfirm>
                } style={{width: 300, marginLeft: "5px"}}>
                    <Form form={FormList[1]}>
                        <Form.Item name={"ipfs"}>
                            <Dragger beforeUpload={() => {
                                return false;
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