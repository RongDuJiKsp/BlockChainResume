import {Content} from "antd/es/layout/layout";
import "./index.css"
import {useState} from "react";

export default function FIndKeyPage(props) {
    const [pageState, setPageState] = useState(0);
    const [loadingState,setLoadingState]=useState([false,false]);
    const Finder = [
        {
            render: function () {

            },
            onNext: function () {
                setPageState(r => r + 1);
            }
        }, {
            render: function () {

            },
            onNext: function () {

            }
        }
    ]
    return (
        <Content style={{height: 900}} className="FindPage">
            <div id="FindMainWindow">
                {Finder[pageState]}

            </div>
        </Content>
    )
}