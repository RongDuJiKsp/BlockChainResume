import {useForm} from "antd/lib/form/Form";
import {Card, Col, Form, Input, Popconfirm, Row} from "antd";
import TextArea from "antd/es/input/TextArea";
import GETKEY from "../../Methods/Chain/GETKEY";
import KeyToAddress from "../../Methods/Chain/KeyToAddress";

export default function EmployerPage() {
    const FormList = [useForm()[0], useForm()[0]];
    const ClickList = [
        function () {

        },
        function () {
            GETKEY(KeyToAddress(FormList[1].getFieldValue("ethkey")),FormList[1].getFieldValue("id")).then(r => console.log(r), e => console.log(e));
        },
    ]
    return (
        <Row>
            {/*<Col span={12}>*/}
            {/*    <Card hoverable={true} title="没做，别急" extra={*/}
            {/*        <Popconfirm*/}
            {/*            title="查询简历" description="请确认个人信息是否无误，确认查询？"*/}
            {/*            onConfirm={ClickList[0]} okText={"确认"} cancelText={"取消"}*/}
            {/*        >*/}
            {/*            <button className={"btn green small"}>按下按钮调用GETKEY</button>*/}
            {/*        </Popconfirm>*/}
            {/*    } style={{width: 300, marginLeft: "15%"}}>*/}
            {/*        /!*<Form form={FormList[0]}>*!/*/}
            {/*        /!*    <h4>请在此输入待查询人员的身份证号(ID)</h4>*!/*/}
            {/*        /!*    <Form.Item name={"id"}>*!/*/}
            {/*        /!*        <Input></Input>*!/*/}
            {/*        /!*    </Form.Item>*!/*/}
            {/*        /!*    <h4>请在此输入待查询人员提供的公钥</h4>*!/*/}
            {/*        /!*    <Form.Item name={"publicKey"}>*!/*/}
            {/*        /!*        <TextArea autoSize={{minRows: 2, maxRows: 8}}/>*!/*/}
            {/*        /!*    </Form.Item>*!/*/}
            {/*        /!*    <Form.Item name={"ipfs"}>*!/*/}
            {/*        /!*        <Dragger beforeUpload={() => {*!/*/}
            {/*        /!*            return false;*!/*/}
            {/*        /!*        }}>*!/*/}
            {/*        /!*            <p className="ant-upload-drag-icon">*!/*/}
            {/*        /!*                <InboxOutlined/>*!/*/}
            {/*        /!*            </p>*!/*/}
            {/*        /!*            <p className="ant-upload-text">点击或拖入文件</p>*!/*/}
            {/*        /!*        </Dragger>*!/*/}
            {/*        /!*    </Form.Item>*!/*/}
            {/*        /!*    <h4>请在此黏贴您的ETH私钥</h4>*!/*/}
            {/*        /!*    <Form.Item name={"ethKey"}>*!/*/}
            {/*        /!*        <TextArea autoSize={{minRows: 2, maxRows: 8}}/>*!/*/}
            {/*        /!*    </Form.Item>*!/*/}
            {/*        /!*</Form>*!/*/}
            {/*    </Card>*/}
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
                        <Form.Item name={"ethKey"}>
                            <TextArea autoSize={{minRows: 2, maxRows: 8}}/>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}