import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { url } from 'inspector';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../funcionario';

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.css']
})
export class FuncionarioFormComponent implements OnInit {

  funcionario: FormGroup = this.fb.group({
    nome:['', [Validators.required, Validators.minLength(3)]],
    email:['',[Validators.required, Validators.email]],
    cargo:['',[Validators.required]],
    salario: [''],
    foto:['']

  })

  id: string | undefined
  urlImagem:any =""

  constructor(private fb:FormBuilder,
              private funcService:FuncionarioService) { }

  ngOnInit(): void {
    this.funcService.getFuncionarioEdit().subscribe(resultado =>{
      console.log(resultado)
      this.id = resultado.id
      this.funcionario.patchValue({
        nome:resultado.nome,
        email: resultado.email,
        cargo: resultado.cargo,
        salario: resultado.salario,
        foto: resultado.foto

      })

    })
  }

  salvarFuncionario(){
    if(this.id == undefined){
      //executar a função de cadastro
      this.addFuncionario()
    }else{
      //executar a função de edição
      this.editarFuncionario(this.id)
    }
  }
  addFuncionario(){
    const FUNCIONARIO: Funcionario={
      nome: this.funcionario.value.nome,
      email: this.funcionario.value.email,
      cargo: this.funcionario.value.cargo,
      salario: this.funcionario.value.salario,
      foto: this.funcionario.value.foto
    }
    this.funcService.addFuncionario(FUNCIONARIO).then(() =>{
      console.log("Funcionário Cadastrado!")
      this.funcionario.reset()
    },error =>{
      console.log("Erro ao cadastrar o funcionário")
    })
    
  }

  editarFuncionario(id:string){
    const FUNCIONARIO: Funcionario={
      nome: this.funcionario.value.nome,
      email: this.funcionario.value.email,
      cargo: this.funcionario.value.cargo,
      salario: this.funcionario.value.salario,
      foto: this.funcionario.value.foto
  }
  this.funcService.editarFuncionario(id,FUNCIONARIO).then(() =>{
    this.funcionario.reset()
    this.id = undefined
  },error => {
    console.log("Erro ao editar um funcionario" + error)
  })
  }

  carregarImagem(event:any){
    let arquivo = event.target.files
    let reader = new FileReader()

    reader.readAsDataURL(arquivo[0])
    reader.onloadend = () => {
      console.log(reader.result)
      this.funcService.subirImagem("funcionario" + Date.now(), reader.result).then(urlImagem => {
        console.log(urlImagem)
        this.urlImagem = urlImagem
      })
    }
  } 
}