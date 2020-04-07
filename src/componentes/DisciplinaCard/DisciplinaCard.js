import React, { Component } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Col, Card, Badge, Button } from 'antd';

export default class DisciplinaCard extends Component {
    constructor(props) {
        super(props);
        this.handleDisciplina = this.handleDisciplina.bind(this);
    }

    handleDisciplina() {
        this.props.onDisciplina(this.props.disciplina.codDisciplina);
        //console.log(this.props.disciplina.codDisciplina);
    }

    render() {
        const disciplina = this.props.disciplina;
        return (
            <Col key={disciplina.codDisciplina} xs={20} sm={7} xl={7} style={{ margin: "10px 0px" }}>
                <Badge count={disciplina.nota}>
                    <Card bordered={true}
                        actions={[<Button onClick={this.handleDisciplina} type="dashed" shape="circle" icon={<EditOutlined key="edit" />} />]}>
                        {disciplina.disciplina}
                    </Card>
                </Badge>
            </Col>
        )
    }
}
