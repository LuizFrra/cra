export default class Disciplina {

    static cra = 0;

    constructor(disciplinaData) {
        var disciplinaDataSplited = disciplinaData.split(" ");
        this.semestre = disciplinaDataSplited[0];
        this.situacao = disciplinaDataSplited[2];
        this.codDisciplina = disciplinaDataSplited[3];
        this.nota = parseFloat(disciplinaDataSplited[4]);
        this.disciplina = "";
        for(var i = 6; i < disciplinaDataSplited.length - 1; i++) {
            this.disciplina += disciplinaDataSplited[i] + " ";
        }
        this.cargaHoraria = parseFloat(disciplinaDataSplited[disciplinaDataSplited.length - 1]);
        this.includeCalc = true;
        if(this.situacao === "MATRICULADO") {
            this.includeCalc = false;
            this.nota = 0;
        }
    }

    imprimirDados() {
        console.log(this.disciplina);
        console.log(this.nota);
        console.log(this.cargaHoraria);
        console.log(this.situacao);
    }

    static obterCRA(disciplinas) {
        var numerador = 0;
        var denominador = 0;
        for(var disciplina of disciplinas) {
            if(disciplina.includeCalc) {
                numerador += (disciplina.cargaHoraria * disciplina.nota);
                denominador += disciplina.cargaHoraria;
            }
        }
        Disciplina.cra = numerador/denominador;
        return (numerador/denominador).toFixed(2);
    }
}