import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EndPointService } from 'src/app/services/auth.service';

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
  identificador_usuario: string = '';

  constructor(private authService: EndPointService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    this.resetSenhaForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    
    this.route.queryParams.subscribe( params =>{
      this.identificador_usuario = params['identificador_usuario']
    })
  }
  
  onSubmit() {
    if (this.resetSenhaForm.valid) {
      const password = this.resetSenhaForm.value.password;
      const confirmPassword = this.resetSenhaForm.value.confirmPassword;

      console.log({password, confirmPassword})
      if (password === confirmPassword) {
        this.authService.resetSenha({identificador_usuario: this.identificador_usuario, nova_senha: password}).subscribe(
          (data) => {
            console.log(data);
            this.router.navigateByUrl("/home")
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        console.log('As senhas não são iguais');
      }
    }
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
}
