import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { EndPointService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  password: string = '';
  visible: boolean = false;
  loginForm!: FormGroup;

  constructor(private auth: EndPointService, private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, this.ngModelValidator]]
    })
  }

  ngOnInit(): void {
  }

  ngModelValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const hasNgModel = control.value && control.value.includes('[(ngModel)]');
    return hasNgModel ? { ngModelError: true } : null;
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe({
        next: (response) => {
          if(response.response === 200){
            localStorage.setItem('email', response.dados_extras.email || "");
            localStorage.setItem('identificador_usuario', response.dados_extras.identificador_usuario || "");
            localStorage.setItem('nome_usuario', response.dados_extras.nome_completo || "");
            localStorage.setItem('supervisor', response.dados_extras.supervisor || "");
            
            this.router.navigateByUrl("/telaDashboard")
          }
          else{
            alert(response.mensagem)
            console.log(response)
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

  viewPassword() {
    this.visible = !this.visible;
  }

  singnIn() {
    alert('Você está logado!');
  }

}
