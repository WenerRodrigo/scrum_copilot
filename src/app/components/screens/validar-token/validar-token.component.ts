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
    if (this.token === '') {
      this.tokenValido = false;
      return;
    }

    const tokenObj = {
      token: this.token
    };

    this.authService.validToken(tokenObj).subscribe(
      (response: any) => {
        if (response.tokenValido) {
          this.tokenValido = true;
          alert('Token válido! Redirecionando para redefinir a senha.');
        } else {
          this.tokenValido = false;
          alert('Token inválido. Tente novamente.');
        }
      },
      (error: any) => {
        this.tokenValido = false;
        console.error('Erro ao validar o token:', error);
      }
    );
  }
  signIn() {
    alert("Token enviado com sucesso!")
  }
}
