import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-validar-email',
  templateUrl: './validar-email.component.html',
  styleUrls: ['./validar-email.component.css']
})
export class ValidarEmailComponent implements OnInit {

  email: string = "";
  inputInvalid: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  enviarEmail() {
    if(this.email === '') {
      this.inputInvalid = true;
      return
    }

    alert('Email enviado com sucesso!');
  }
}
