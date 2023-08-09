import Login from "./Components/Login";
import ProjectRouter from "./Components/ProjectRouter"
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import "./App.css"
import {LoginStateEnum} from "./Data/enums";
import {message, Modal} from "antd";
import StatusManager from "./Methods/StatusManager";

export default function App() {
    const [loginState, setLoginState] = useState(LoginStateEnum.none);
    const Jump = useNavigate();
    const logoutfunc = () => {
        setLoginState(LoginStateEnum.none);
        setUserId("");
        Jump("/");
    }
    const close = function () {
        setModelVisible(false);
    }
    const [userId, setUserId] = useState("");
    const [userTmpValues, setUserTmpValues] = useState([""]);
    const [messageApi, contextHolder] = message.useMessage();
    const [isModelVisible, setModelVisible] = useState(false);
    const [modelContents, setModelContents] = useState(["title", "tips", () => {
    }, () => {
    }]);
    const modelHandle = {
        setModelVisible: setModelVisible,
        setTitle: (text) => {
            StatusManager.ChangeStateOfArray(setModelContents, 0, text);
        },
        setContext: (text) => {
            StatusManager.ChangeStateOfArray(setModelContents, 1, text);
        },
        setOkMethod: (method) => {
            StatusManager.ChangeStateOfArray(setModelContents, 2, method);
        },
        setCancelMethod: (method) => {
            StatusManager.ChangeStateOfArray(setModelContents, 3, method);
        },
        ShowMessageByModal(title, context) {
            if(typeof title!=="string") title=String(title);
            if(context!==undefined&&typeof context!=="string") context=String(context);
            this.setTitle(title);
            if (context !== undefined) this.setContext(context);
            else this.setContext("");
            this.setModelVisible(true);
        },
        ResetCheckHappen:()=>{
            StatusManager.ChangeStateOfArray(setModelContents, 2, close);
            StatusManager.ChangeStateOfArray(setModelContents, 3, close);
        },
        messageApi: messageApi
    }
    useEffect(() => {//默认设置点击确认，取消为关闭
        StatusManager.ChangeStateOfArray(setModelContents, 2, close);
        StatusManager.ChangeStateOfArray(setModelContents, 3, close);
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
                Jump: Jump
            }} modelhandle={modelHandle}/> : <ProjectRouter datapack={{
                loginState: loginState,
                userId: userId,
                Jump: Jump,
                userTmpValues: userTmpValues,
                setUserTmpValues: setUserTmpValues,
                logoutfunc: logoutfunc,
            }} modelhandle={modelHandle}/>}
        </>
    )

}