import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-senha',
  templateUrl: './reset-senha.component.html',
  styleUrls: ['./reset-senha.component.css']
})
export class ResetSenhaComponent implements OnInit {

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
    //this.singIn(this.password)
  }

  singIn() {
    alert("Senha alterada com sucesso!")
  }

}
