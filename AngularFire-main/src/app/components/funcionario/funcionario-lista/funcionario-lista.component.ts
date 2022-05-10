import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../funcionario';

@Component({
  selector: 'app-funcionario-lista',
  templateUrl: './funcionario-lista.component.html',
  styleUrls: ['./funcionario-lista.component.css']
})
export class FuncionarioListaComponent implements OnInit {

  funcionarios : Funcionario[] = []

  columns: string[] = ['nome', 'email', 'cargo', 'salario', 'actions']
  carregando = false

  constructor(
    private funcService: FuncionarioService
  ) { }

  ngOnInit(): void {
    this.listarFuncionarios()
  }

  listarFuncionarios(){
    this.funcService.listarFuncionarios().subscribe(doc =>{
      console.log(doc)
      this.funcionarios = []
      doc.forEach((element: any) => {
        this.funcionarios.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()})
      })
    })
    console.log(this.funcionarios)
  }
  excluirFuncionario(id: string){
    this.funcService.excluirFuncionario(id).then(()=>{
      console.log("Funcionario excluído!")
    }, error=>{
      console.log("Erro ai excluir um funcionário" + error)
    })
  }
  editarFuncionario(funcionario:Funcionario){
    this.funcService.pegarDadosDoFuncionarioEscolhido(funcionario)
  }

}