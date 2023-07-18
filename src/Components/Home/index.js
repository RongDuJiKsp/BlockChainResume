import {Card, Col, Layout, Row} from "antd";
import {Content, Footer} from "antd/es/layout/layout";

import "./index.css"
import "../../ModelCSS/Button.css"

export default function Home(props) {

    return (
        <Layout>
            <Content style={{height:"700px"}} className={"HomeContent"}>
                <Row>
                    <Col span={8}>
                        <Card hoverable={true} title="发起一个请求" extra={
                            <button className={"btn green small"}>Jump</button>
                        } style={{width: 300, margin: "5px"}}>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card hoverable={true} title="Default size card" extra={
                            <button className={"btn green small"}></button>
                        } style={{width: 300, margin: "5px"}}>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card hoverable={true} title="Default size card" extra={
                            <button className={"btn green small"}></button>
                        } style={{width: 300, margin: "5px"}}>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </Col>
                </Row>
            </Content>
            <Footer>
                版权所有
            </Footer>
        </Layout>
    )
}