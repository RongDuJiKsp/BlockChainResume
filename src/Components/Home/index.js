import {Card, Col, Row} from "antd";
import {Content} from "antd/es/layout/layout";

import "./index.css"
import "../../ModelCSS/Button.css"

export default function Home(props) {

    return (
<div>
    <Content style={{height:"700px"}} className={"HomeContent"}>
       <div id={"HomeCardList"}>
           <Row>
               <Col span={8}>
                   <Card hoverable={true} title="发起一个请求" extra={
                       <button className={"btn green small"}>Jump</button>
                   } style={{width: 300, marginLeft: "5px"}}>
                       <p>Card content</p>
                       <p>Card content</p>
                       <p>Card content</p>
                   </Card>
               </Col>
               <Col span={8}>
                   <Card hoverable={true} title="Default size card" extra={
                       <button className={"btn green small"}></button>
                   } style={{width: 300, marginLeft: "5px"}}>
                       <p>Card content</p>
                       <p>Card content</p>
                       <p>Card content</p>
                   </Card>
               </Col>
               <Col span={8}>
                   <Card hoverable={true} title="Default size card" extra={
                       <button className={"btn green small"}></button>
                   } style={{width: 300, marginLeft: "5px"}}>
                       <p>Card content</p>
                       <p>Card content</p>
                       <p>Card content</p>
                   </Card>
               </Col>
           </Row>
       </div>
    </Content>
</div>
    )
}