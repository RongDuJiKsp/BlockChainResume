import {Content} from "antd/es/layout/layout";
import {Button, Form, Input, Popconfirm, Table} from "antd";
import "./index.css"
import "../../ModelCSS/Button.css"
import {useState} from "react";
import {useForm} from "antd/lib/form/Form";
import {useNavigate, useSearchParams} from "react-router-dom";
import Download from "../../Methods/Download";
import axios from "axios";
import {ConfigEnum} from "../../Data/enums";
import {UpOrDownloadIPFS} from "../../Methods/Chain/upOrDownloadIPFS";
import uploadETH from "../../Methods/Chain/uploadETH";
import KeyToAddress from "../../Methods/Chain/KeyToAddress";
import CryptoOfHash from "../../Methods/Chain/CryptoOfHash";

export default function Verify(props) {
    const [datas, setDatas] = useState([]);
    const [dataList, setDataList] = useState([]);
    const [chosenID, setChosenID] = useState("");
    const [params] = useSearchParams()
    const [form] = useForm();
    const Jump = useNavigate();
    const CAETHKey = params.getAll('key')[0];
    const AcceptMethod = () => {
        uploadETH(KeyToAddress(CAETHKey),
            KeyToAddress(dataList[chosenID]["ethkey"]),
            chosenID, CryptoOfHash.encryptedData(dataList[chosenID]["hash"], dataList[chosenID]["s"]))
            .then(r => {
                console.log(r);
            }, e => {
                console.log(e);
            });
    }
    const DelyMethod = () => {
    }
    const clickDownload = () => {
        props.modelhandle.ShowMessageByModal("下载已启动", "请稍后。。。");
        let hashvalue = dataList[chosenID]["hash"];
        UpOrDownloadIPFS.get(hashvalue).then(r => {
            let tmpBuffer = r.content.buffer;
            let file = new Blob([tmpBuffer], {
                type: ConfigEnum.SupposedFileType
            });
            Download(file, chosenID, ConfigEnum.SupposedFileType);
        }, e => {
            props.modelhandle.ShowMessageByModal("发生错误", e.toString());
        })
    }
    const clickSubmit = (e) => {
        form.setFieldValue("id", e);
        setChosenID(e);
    }
    const freshData = () => {
        axios.get("http://localhost:" + ConfigEnum.BackendPort + "/getlist").then(r => {
            //TODO: 适配后端发来的结果，变成对象
            setDatas(Object.keys(r.data));
            setDataList(r.data);
        }, e => {
            props.modelhandle.ShowMessageByModal("发生错误！", "错误原因" + e.toString());
        })
    }
    const columns = [{
        title: "雇员id",
        dataIndex: "id",
        width: 200,
        align: 'center',

    }, {
        title: "选中操作",
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
                            <Input readOnly></Input>
                        </Form.Item>
                    </Form>
                    <div style={{marginLeft: "25%"}}>
                        <Popconfirm title={"请确认是否下载简历"} onConfirm={clickDownload}>
                            <button className={"btn blue"}>下载</button>
                        </Popconfirm>
                    </div>
                    <div>
                        <Popconfirm title={"请确认是否打回简历"} onConfirm={DelyMethod}>
                            <button className={"btn red"}>简历打回</button>
                        </Popconfirm>
                        <Popconfirm title={"请确认是否通过简历"} onConfirm={AcceptMethod}>
                            <button className={"btn green"}>简历通过</button>
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