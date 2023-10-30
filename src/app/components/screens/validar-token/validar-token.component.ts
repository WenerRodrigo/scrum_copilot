import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EndPointService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-validar-token',
  templateUrl: './validar-token.component.html',
  styleUrls: ['./validar-token.component.css']
})
export class ValidarTokenComponent implements OnInit {

  token: string = "";
  tokenValido: boolean = true;
  tokenForm!: FormGroup

  constructor(private authService: EndPointService, private router: Router) { }

  ngOnInit(): void {
  }

  validarToken() {
    if (this.tokenForm.valid) {
      this.authService.validToken(this.tokenForm.value).subscribe({
        next: (response) => {
          if (response.response === 200) {
            console.log(response);
            this.router.navigateByUrl("/resetSenha");
          }
          else {
            alert(response.mensagem)
            console.log(response)
            this.tokenValido = false;
          }
        },
        error: (error) => {
          console.log(error);
        }
      });
    } else {
      alert('Preencha os campos obrigatórios.');
    }
  }
}
