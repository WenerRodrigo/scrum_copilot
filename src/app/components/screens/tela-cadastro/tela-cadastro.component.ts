import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-tela-cadastro',
  templateUrl: './tela-cadastro.component.html',
  styleUrls: ['./tela-cadastro.component.css']
})
export class TelaCadastroComponent implements OnInit {

    userData: {
    email: string,
    nome_completo: string,
    senha: string,
    data_inclusao: string
  } = {
      email: '',
      nome_completo: '',
      senha: '',
      data_inclusao: ''
    }

  password: string = '';
  visible: boolean = false;
  closeVisible: boolean = false;
  loginForm!: FormGroup

  viewPassword() {
    this.visible = !this.visible;
  }

  closePassword() {
    this.closeVisible = !this.closeVisible;
  }

  togglePasswordVisibility() {
    this.visible = !this.visible;
  }

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.userData.email && this.userData.senha) {
      this.authService.singUp(this.userData).subscribe(
        (response: any) => {
          console.log('Cadastro realizado com sucesso');
        },
        (error: any) => {
          console.error('Erro ao cadastrar:', error);
        }
      );
    } else {
      console.error('Preencha os campos obrigatórios.');
    }
  }

  singIn() {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "email": "jao_vitor-sousa@hotmail.com",
      // "nome_completo": "João Vitor",
      "senha": "654321",
      // "data_inclusao": "2023-10-22T17:49:30.159Z"
    });

    fetch("https://localhost:8000/api/usuarios/authentication", {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    })
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
}