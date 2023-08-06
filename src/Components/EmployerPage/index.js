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