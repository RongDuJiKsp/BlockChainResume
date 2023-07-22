import {Content} from "antd/es/layout/layout";
import {Button, Form, Input, Popconfirm, Table} from "antd";
import "./index.css"
import "../../ModelCSS/Button.css"
import {useState} from "react";
import {useForm} from "antd/lib/form/Form";
import TextArea from "antd/es/input/TextArea";
import {useNavigate, useSearchParams} from "react-router-dom";
import Download from "../../Methods/Download";

export default function Verify(props) {
    const [datas, setDatas] = useState([]);
    const [params] = useSearchParams()
    const [form] = useForm();
    const Jump = useNavigate();
    const AcceptMethod = () => {
        console.log(params.getAll('key')[0]);
    }
    const DelyMethod = () => {
        console.log(params.getAll('key')[0]);
    }
    const clickDownload = () => {
        const blob = new Blob(["content"], {type: 'text/plain'});
        Download(blob);
    }
    const clickSubmit = (e) => {
        form.setFieldValue("id", e);
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
            <button className={"btn-two blue"} onClick={() => Jump("/")}>go back</button>
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
                    <div style={{marginLeft:"25%"}}>
                        <Popconfirm title={"请确认是否下载简历"} onConfirm={clickDownload}>
                            <button className={"btn blue"}>下载</button>
                        </Popconfirm>
                    </div>
                    <div>
                        <Popconfirm title={"请确认是否拒绝"} onConfirm={DelyMethod}>
                            <button className={"btn red"}>拒绝</button>
                        </Popconfirm>
                        <Popconfirm title={"请确认是否同意"} onConfirm={AcceptMethod}>
                            <button className={"btn green"}>同意</button>
                        </Popconfirm>
                    </div>
                </div>
                <div style={{float: "right", marginRight: "15%", width: "30%"}}>
                    <Table size={"middle"} bordered pagination={["bottomRight"]}
                           dataSource={data} columns={columns}
                    ></Table></div>
            </div>
        </Content>
    )
}