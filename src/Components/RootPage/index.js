import {Card} from "antd";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import TextArea from "antd/es/input/TextArea";

export default function RootPage(props) {
    const Jump = useNavigate();
    const [ethKey,setETHKey]=useState("");
    return (
           <div id={"RootWindowBox"}>
               <Card hoverable={true} title="跳转到验证页面" extra={
                   <button className={"btn green small"} onClick={() => {
                       if(ethKey===""){
                           props.modelhandle.messageApi.open({
                               type: "error",
                               content: "请填写ETH私钥！"
                           }).then()
                           return;
                       }
                       Jump("/root?key="+ethKey);
                   }}>跳转</button>
               } style={{width: 300, marginLeft: "35%"}}>
                   <p>请在此黏贴您的ETH私钥</p>
                   <TextArea autoSize={{minRows: 2, maxRows: 8}} onChange={e=>setETHKey(e.target.value)}/>
               </Card>
           </div>
    )
}