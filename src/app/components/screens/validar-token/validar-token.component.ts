import { Component, OnInit } from '@angular/core';
import { EndPointService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-validar-token',
  templateUrl: './validar-token.component.html',
  styleUrls: ['./validar-token.component.css']
})
export class ValidarTokenComponent implements OnInit {

  token: string = "";
  tokenValido: boolean = true;

  constructor(private authService: EndPointService) { }

  ngOnInit(): void {
  }

  validarToken() {
    this.authService.validToken({ token: this.token }).subscribe({
      next: (response) => {
        if (response.response === 200) {
          console.log('Token válido');
          this.tokenValido = true;
          this.signIn()
        }
        else {
          console.log(response)
          alert(response.mensagem)
          this.tokenValido = false;
        }
      },
      error: (error) => {
        console.log("Erro na solicitação HTTP:", error)
      }
    })
  }


  signIn() {
    alert("Token enviado com sucesso!")
  }
}
