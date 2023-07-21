import {useForm} from "antd/lib/form/Form";
import {Card, Col, Form, Input, Row} from "antd";
import TextArea from "antd/es/input/TextArea";

export default function EmployerPage() {
    const FormList = [useForm()[0], useForm()[0]];
    const ClickList = [
        function () {
        }, function () {
            FormList[1].setFieldValue("ipfs", "原神！");
        },
    ]
    return (
        <Row>
            <Col span={12}>
                <Card hoverable={true} title="查询简历合法性" extra={
                    <button className={"btn green small"} onClick={ClickList[0]}>查询</button>
                } style={{width: 300, marginLeft: "15%"}}>
                    <Form form={FormList[0]}>
                        <h4>请在此输入待查询人员的身份证号(ID)</h4>
                        <Form.Item name={"id"}>
                            <Input></Input>
                        </Form.Item>
                        <h4>请在此输入待查询人员提供的公钥</h4>
                        <Form.Item name={"publicKey"}>
                            <TextArea autoSize={{minRows: 2, maxRows: 8}}/>
                        </Form.Item>
                        <h4>请在此输入待查询人员提供的ipfs</h4>
                        <Form.Item name={"ipfs"}>
                            <TextArea autoSize={{minRows: 2, maxRows: 8}}/>
                        </Form.Item>
                        <p>请在此黏贴您的ETH私钥</p>
                        <Form.Item name={"ethKey"}>
                            <TextArea autoSize={{minRows: 2, maxRows: 8}}/>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
            <Col span={12}>
                <Card hoverable={true} title="下载简历" extra={
                    <button className={"btn green small"} onClick={ClickList[1]}>下载</button>
                } style={{width: 300, marginLeft: "15%"}}>
                    <Form form={FormList[1]}>
                        <h4>请在此输入待查询人员的身份证号(ID)</h4>
                        <Form.Item name={"id"}>
                            <Input></Input>
                        </Form.Item>
                        <h4>请在此输入待查询人员提供的公钥</h4>
                        <Form.Item name={"publicKey"}>
                            <TextArea autoSize={{minRows: 2, maxRows: 8}}/>
                        </Form.Item>
                        <p>请在此黏贴您的ETH私钥</p>
                        <Form.Item name={"ethKey"}>
                            <TextArea autoSize={{minRows: 2, maxRows: 8}}/>
                        </Form.Item>
                        <h4>请按下按钮后在此复制ipfs</h4>
                        <Form.Item name={"ipfs"}>
                            <TextArea autoSize={{minRows: 2, maxRows: 8}}/>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}