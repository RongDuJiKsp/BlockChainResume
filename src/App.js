import Login from "./Components/Login";
import ProjectRouter from "./Components/ProjectRouter"
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import "./App.css"
import {LoginStateEnum} from "./Data/enums";
import {message, Modal} from "antd";

export default function App() {
    const [loginState, setLoginState] = useState(LoginStateEnum.none);
    const Jump = useNavigate();
    const logoutfunc = () => {
        setLoginState(LoginStateEnum.none);
        setUserId("");
        setPassword("");
        Jump("/");
    }
    const [userId, setUserId] = useState("");
    const [userPassword, setPassword] = useState("");
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
        ShowMessageByModal(title,context){
            this.setTitle(title);
            this.setContext(context);
            this.setModelVisible(true);
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
            {loginState === LoginStateEnum.none ? <Login methodpack={{
                setLoginState: setLoginState,
                setUserId: setUserId,
                setPassword: setPassword,
            }} modelhandle={modelHandle}/> : <ProjectRouter datapack={{
                loginState: loginState,
                userId: userId,
                userPassword: userPassword,
                logoutfunc: logoutfunc,
            }} modelhandle={modelHandle}/>}
        </>
    )

}