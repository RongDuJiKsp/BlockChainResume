import {Route, Routes} from "react-router-dom";

import Home from "../Home";
import HeaderBar from "../HeaderBar";
import Signup from "../Signup";
import {Layout, message, Modal} from "antd";
import {Footer} from "antd/es/layout/layout";
import Verify from "../Verify";
import {useEffect, useState} from "react";

export default function ProjectRouter(props) {
    const [messageApi, contextHolder] = message.useMessage();
    const [isModelVisible, setModelVisible] = useState(false);
    const [modelContents, setModelContents] = useState(["title", "tips", () => {
    }, () => {
    }]);
    const modelHandle = {
        setModelVisible: setModelVisible,
        setTitle: (text) => {
            setModelContents(old => {
                let n = [...old];
                n[0] = text;
                return n;
            })
        },
        setContext: (text) => {
            setModelContents(old => {
                let n = [...old];
                n[1] = text;
                return n;
            })
        },
        setOkMethod: (method) => {
            setModelContents(old => {
                let n = [...old];
                n[2] = method;
                return n;
            })
        },
        setCancelMethod: (method) => {
            setModelContents(old => {
                let n = [...old];
                n[3] = method;
                return n;
            })
        },
        messageApi: messageApi
    }
    useEffect(() => {//默认设置点击确认，取消为关闭
        setModelContents(old => {
            let n = [...old];
            n[2] = () => {
                setModelVisible(false);
            };
            n[3] = () => {
                setModelVisible(false);
            }
            return n;
        });
    }, [])
    return (
        <>
            <Modal open={isModelVisible} title={modelContents[0]} onOk={modelContents[2]} onCancel={modelContents[3]}>
                <p>{modelContents[1]}</p>
            </Modal>
            {contextHolder}
            <Layout>
                <HeaderBar datapack={props.datapack}/>
                <Routes>
                    <Route exact={true} path={"/"}
                           element={<Home datapack={props.datapack} modelhandle={modelHandle}/>}></Route>
                    <Route exact={false} path={"/signup"}
                           element={<Signup datapack={props.datapack} modelhandle={modelHandle}/>}></Route>
                    <Route path={"/root"}
                           element={<Verify datapack={props.datapack} modelhandle={modelHandle}/>}></Route>
                </Routes>
                <Footer>
                    版权所有@app
                </Footer>
            </Layout></>
    )
}