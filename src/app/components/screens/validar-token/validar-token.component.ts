import { Component, OnInit } from '@angular/core';
import { EndPointService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-validar-token',
  templateUrl: './validar-token.component.html',
  styleUrls: ['./validar-token.component.css']
})
export class ValidarTokenComponent implements OnInit {

  identificador_usuario: string = "";

  token: string = "";
  tokenValido: string = "";
  
  validToken!: FormGroup;

  constructor(private authService: EndPointService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    this.validToken = this.formBuilder.group({
      tokenValido: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe( params =>{
      this.identificador_usuario = params['identificador_usuario']
    })

    
    this.authService.getToken(this.identificador_usuario).subscribe({
      next: (response) => {
        this.token = response.dados_extras.token
      },
      error: (error) => {
        console.log("Erro na solicitação HTTP:", error)
      }
    })
  }

  validarToken() {
    if(this.token === this.validToken.value.tokenValido)
    {
      this.router.navigateByUrl("/resetSenha?identificador_usuario=" + this.identificador_usuario)
    }
    else{
      alert("O Token digitado está incorreto!")
    }
  }
}
