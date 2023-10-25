import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-validar-token',
  templateUrl: './validar-token.component.html',
  styleUrls: ['./validar-token.component.css']
})
export class ValidarTokenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  signIn(){
    alert("Token enviado com sucesso!")
  }

}
