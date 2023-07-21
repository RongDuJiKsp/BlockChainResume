import {Content} from "antd/es/layout/layout";
import {Button, Form, Input, Table} from "antd";
import "./index.css"
import "../../ModelCSS/Button.css"
import {useState} from "react";
import {useForm} from "antd/lib/form/Form";
import TextArea from "antd/es/input/TextArea";
import {useNavigate} from "react-router-dom";

export default function Verify(props) {
    const [datas, setDatas] = useState([]);
    const [form] = useForm();
    const Jump=useNavigate();
    const clickSubmit = (e) => {
        form.setFieldValue("id", e);
        form.setFieldValue("ipfs", e);
    }
    const freshData = () => {
        setDatas([1, 2, 3, 4, 5, 2422222222222]);
    }
    const columns = [{
        title: "雇员id",
        dataIndex: "id",
        align: 'center',
        width: 200
    }, {
        title: "Action",
        align: 'center',
        render: (_, record) => {
            return (
                <Button type={"primary"} onClick={() => {
                    clickSubmit(record.id);
                }}>选中</Button>
            )
        }

    }]
    const data = datas.map((d) => {
        return {
            key: d,
            id: d,
        }
    })
    return (
        <Content style={{height: "700px"}}>
            <button className={"btn-two blue"} onClick={()=>Jump("/")}>go back</button>
            <button className={"btn-two green"} onClick={freshData}>fresh data</button>
            <div id={"VerifyWindow"}>
                <div style={{float: "left", marginLeft: "10%"}}>
                    <Form form={form}>
                        <h4>请确认选中的id</h4>
                        <Form.Item name={"id"}>
                            <Input></Input>
                        </Form.Item>
                        <h3>在此复制选择的ipfs</h3>
                        <Form.Item name={"ipfs"}>
                            <TextArea autoSize={{minRows: 2}}></TextArea>
                        </Form.Item>
                    </Form>
                </div>
                <div style={{float: "right", marginRight: "15%", width: "30%"}}>
                    <Table size={"middle"} bordered pagination={["bottomRight"]}
                           dataSource={data} columns={columns}
                    ></Table></div>
            </div>
        </Content>
    )
}