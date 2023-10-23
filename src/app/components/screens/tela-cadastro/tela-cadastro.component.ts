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

  singIn() {
    alert("Cadastro realizado com sucesso!");
  }

}
