import React, { Component } from 'react'
import 'antd/lib/notification/style/index.css';
import './App.scss';
import SiderBar from './componentes/SideBar/SiderBar';
import UploadContent from './componentes/UploadContent/UploadContent';
import pdfSigaa from './Utils/pdfSigaa';
import Disciplina from './Utils/Disciplina';
import { notification } from 'antd';
import DisciplinaContent from './componentes/DisciplinaContent/DisciplinaContent';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            semestres: [],
            showUploadArea: true,
            periodos: [],
            showDisciplinaArea: false,
            selPeriodo: ""
        };
    }

    handlePeriodoClick = (periodo) => {
        if(periodo !== this.state.selPeriodo)
            this.setState({ selPeriodo: periodo });
    }

    handlePdfUpload = (pdf) => {
        this.pdf = new pdfSigaa(pdf);
        return this.pdf.getTextFromPdf().then((text) => {

            var allMatchs = text.match(/(\d{4}\.(1|2)).([^\s]+).(APROVADO|REPROVADO|DISPENSADO|MATRICULADO).([^\s]+).([^\s]+)([^\d]+)(\d{2})/gm);

            if (allMatchs === null) {
                notification.error({ message: "Arquivo Inválido !" });
                return;
            }
            var semestres = {};

            for (var match of allMatchs) {
                var disciplina = new Disciplina(match);
                
                if(semestres[disciplina.semestre] === undefined)
                    semestres[disciplina.semestre] = [];
                
                semestres[disciplina.semestre].push(disciplina);
            }

            const disciplinas = (Array.prototype.concat(...Object.values(semestres)));
            const periodos = (Object.keys(semestres));
            
            Disciplina.obterCRA(disciplinas)
            notification.info({ message: "CRA : " + Disciplina.cra.toFixed(2) });
            this.setState({ semestres: semestres, showUploadArea: false, periodos: periodos, selPeriodo: periodos[0], showDisciplinaArea: true });
        });
    }

    renderContentArea() {
        if (this.state.showUploadArea && !this.state.showDisciplinaArea) {
            return (<UploadContent onUploadPdf={this.handlePdfUpload}></UploadContent>);
        }
        if(!this.state.showUploadArea && this.state.showDisciplinaArea) {
            const disciplinas = this.state.semestres[this.state.selPeriodo];
            return (<DisciplinaContent key={this.state.selPeriodo} disciplinas={disciplinas}></DisciplinaContent>);
        }
    }

    componentDidMount() {
        this.handlePdfUpload(null);
    }

    render() {

        return (
            <React.Fragment>
                <SiderBar onPeriodo={this.handlePeriodoClick} periodos={this.state.periodos}>
                </SiderBar>
                {this.renderContentArea()}
            </React.Fragment>
        )
    }
}
