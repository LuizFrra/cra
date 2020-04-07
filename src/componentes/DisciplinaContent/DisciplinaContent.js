import React, { Component } from 'react';
import 'antd/lib/card/style/css.js';
import 'antd/lib/grid/style/css.js';
import 'antd/lib/badge/style/index.css';
import 'antd/lib/button/style/index.css';
import './disciplinaContent.scss';
import 'antd/lib/input-number/style/index.css';
import 'antd/lib/modal/style/index.css';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Row, Col, Card, Badge, InputNumber, Modal } from 'antd';
import DisciplinaCard from '../DisciplinaCard/DisciplinaCard';
import Disciplina from '../../Utils/Disciplina';

const { confirm } = Modal;

export default class DisciplinaContent extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            disciplinasRenders: [],
            changeNota: 0,
            changeDisciplina: ""
        };
        this.handleDisciplina = this.handleDisciplina.bind(this);
    }
    
    handleNota = (value) => {
        this.setState({ changeNota: value });
    }

    handleConfirmNota = () => {
        console.log(this.state.changeNota);
        console.log(this.state.changeDisciplina);
    }

    showModalNota(defaultNota, title) {
        confirm({
            icon: <ExclamationCircleOutlined />,
            title: title,
            content: <InputNumber min={0} max={10} step={0.1} defaultValue={defaultNota} onChange={this.handleNota}/>,
            onOk: this.handleConfirmNota
        });
    }

    handleDisciplina(codDisciplina) {
        const disciplinas = this.props.disciplinas;
        const selDisciplina = disciplinas.find(x => x.codDisciplina === codDisciplina);
        this.showModalNota(selDisciplina.nota, selDisciplina.disciplina);
        this.setState({ changeDisciplina: selDisciplina });
    }

    componentDidMount() {
        var disciplinasRenders = [];
        var count = 0;
        const craSemestre = {
            nota: Disciplina.obterCRA(this.props.disciplinas),
            disciplina: "CRA Apenas Do Semestre Selecionado",
        }

        disciplinasRenders.push(
            <Col key={"373kdjd9339d"} xs={20} sm={7} xl={7} style={{ margin: "10px 0px" }}>
                <Badge count={isNaN(craSemestre.nota) ? 0 : craSemestre.nota}>
                    <Card bordered={true}>
                        {craSemestre.disciplina}
                    </Card>
                </Badge>
            </Col>
        );

        for(var disciplina of this.props.disciplinas) {
            disciplinasRenders.push(
                <DisciplinaCard onDisciplina={this.handleDisciplina} key={count} disciplina={disciplina}></DisciplinaCard>      
            );
            count++;
        }

        this.setState({ disciplinasRenders: disciplinasRenders });
    }

    render() {
        return (
            <div className={"contentDis"} id="style-2">
                <Row justify={"space-around"} style={{marginTop:"30px"}} >
                    {this.state.disciplinasRenders}
                </Row>
            </div>
        )
    }
}
