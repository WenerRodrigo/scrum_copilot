import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EndPointService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-tela-cadastro',
  templateUrl: './tela-cadastro.component.html',
  styleUrls: ['./tela-cadastro.component.css']
})
export class TelaCadastroComponent implements OnInit {

  visible: boolean = false;
  closeVisible: boolean = false;
  createForm!: FormGroup

  viewPassword() {
    this.visible = !this.visible;
  }

  closePassword() {
    this.closeVisible = !this.closeVisible;
  }

  togglePasswordVisibility() {
    this.visible = !this.visible;
  }

  constructor(private authService: EndPointService, private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router) {
    this.createForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      senha: ['', [Validators.required]],
      nome_completo: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      supervisor: [false],
      role: [''],
    })
  }

  ngOnInit(): void {

  }

  onCreate() {
   if(this.createForm.valid) {
      this.authService.gerarusuario(this.createForm.value).subscribe({
        next: (response) => {
          if(response.response === 200){
            alert(response.mensagem)
            this.router.navigateByUrl("/home")
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



  uncheckSupervisor() {
    console.log('Método uncheckSupervisor() chamado');
    this.createForm.get('supervisor')?.setValue(false);
  }

  updateRole(role: string) {
    this.createForm.get('role')?.setValue(role);
  }
}