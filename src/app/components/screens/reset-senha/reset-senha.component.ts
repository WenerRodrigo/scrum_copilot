import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-reset-senha',
  templateUrl: './reset-senha.component.html',
  styleUrls: ['./reset-senha.component.css']
})
export class ResetSenhaComponent implements OnInit {

  password: string = '';
  visible: boolean = false;
  closeVisible: boolean = false;
  resetSenhaForm: FormGroup;

  constructor() {
    this.resetSenhaForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])

    })

  }

  onSubmit() {
    if (this.resetSenhaForm.valid) {
      console.log("Senha válida: " + this.resetSenhaForm.value.password)
    }
    console.log("this.password")
    console.log(this.password)
    //this.singIn(this.password)
  }

  viewPassword() {
    this.visible = !this.visible;
  }

  closePassword() {
    this.closeVisible = !this.closeVisible;
  }

  togglePasswordVisibility() {
    this.visible = !this.visible;
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

  ngOnInit(): void {
  }
}
