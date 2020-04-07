import React, { Component } from 'react'
import { Layout } from 'antd'
import './SideBar.scss';
import Icon from '@ant-design/icons';
const { Sider } = Layout;

const monkeySvg = () => (<img height={30} src="macaco.svg" />);

export default class SiderBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            periodos: [], periodosRender: []
        };
    }

    handlePeriodo = (e) => {
        this.props.onPeriodo(e.target.dataset.index);
    }

    handleCra = () => {
        this.props.onCra();
    }

    componentDidUpdate(nextProps) {
        if (nextProps.periodos !== this.state.periodos) {
            var periodosRender = [];

            periodosRender.push(
                <div key={"crads"} className={"periodo"} onClick={this.handleCra}>
                    CRA
                </div>   
            );

            for (var periodo of nextProps.periodos) {
                periodosRender.push(
                    <div className={"periodo"} data-index={periodo} key={periodo} onClick={this.handlePeriodo}>
                        {periodo}
                    </div>
                );
            }
            this.setState({ periodosRender: periodosRender, periodos: nextProps.periodos });
        }
    }

    render() {
        return (
            <React.Fragment>
                <Layout>
                    <Sider width={200} collapsed={true} className={"sideBar"}>
                        <div className={"buttonCollapse"}>
                            <Icon component={monkeySvg} className={"trigger"} />
                        </div>
                        <div className={"listPeriodos"} id="style-2">
                            {this.state.periodosRender}
                        </div>
                    </Sider>
                </Layout>
            </React.Fragment>
        )
    }
}
