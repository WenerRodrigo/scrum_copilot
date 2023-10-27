import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EndPointService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-tela-cadastro',
  templateUrl: './tela-cadastro.component.html',
  styleUrls: ['./tela-cadastro.component.css']
})
export class TelaCadastroComponent implements OnInit {

  visible: boolean = false;
  closeVisible: boolean = false;
  createForm!: FormGroup

  viewPassword() {
    this.visible = !this.visible;
  }

  closePassword() {
    this.closeVisible = !this.closeVisible;
  }

  togglePasswordVisibility() {
    this.visible = !this.visible;
  }

  constructor(private authService: EndPointService, private formBuilder: FormBuilder , private httpClient: HttpClient, private router: Router) {
    this.createForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      senha: ['', [Validators.required]],
      nome_completo: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  onCreate() {
    console.log(this.createForm.value)
    if (this.createForm.valid) {
      if(this.createForm.value.senha === this.createForm.value.confirmPassword){
        console.log('Entrou')
        this.authService.signUp({senha: this.createForm.value.senha, email: this.createForm.value.email, nome_completo: this.createForm.value.nome_completo}).subscribe({
          next: (response) => {
            if(response.response === 200){
              console.log('Cadastro realizado com sucesso');
              this.router.navigateByUrl("/home")
            }
            else{
              console.log(response)
              alert(response.mensagem)
            }
          },
          error: (error) => {
            console.error('Erro ao cadastrar:', error);
          }
        }
        );
      }
      else{
        alert('As senhas digitadas não são iguais')
      }
    } else {
      alert('Preencha os campos obrigatórios.');
    }
  }
}