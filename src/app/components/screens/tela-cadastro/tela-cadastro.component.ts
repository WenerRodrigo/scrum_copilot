import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tela-cadastro',
  templateUrl: './tela-cadastro.component.html',
  styleUrls: ['./tela-cadastro.component.css']
})
export class TelaCadastroComponent implements OnInit {

  password: string = '';
  visible: boolean = false;
  closeVisible: boolean = false;

  viewPassword() {
    this.visible = !this.visible;
  }

  closePassword() {
    this.closeVisible = !this.closeVisible;
  }

  togglePasswordVisibility() {
    this.visible = !this.visible;
  }

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log("this.password")
    console.log(this.password)
    // this.singIn(this.password)
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