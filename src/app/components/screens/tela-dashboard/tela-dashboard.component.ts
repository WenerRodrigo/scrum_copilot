import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { EndPointService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tela-dashboard',
  templateUrl: './tela-dashboard.component.html',
  styleUrls: ['./tela-dashboard.component.css']
})
export class TelaDashboardComponent implements OnInit {
  porcentagemConcluida: number = 0
  identificador_usuario: string;
  supervisor: boolean;
  pendentes: number = 0;
  execucao: number = 0;
  concluidas: number = 0;
  atraso: number = 0;

  constructor(private router: Router, private authService: EndPointService) {
    this.identificador_usuario = localStorage.getItem('identificador_usuario') || '';
    this.supervisor = Boolean(localStorage.getItem('supervisor')) || false;
  }

  ngOnInit(): void {
    this.authService.selectMetas(this.identificador_usuario, this.supervisor).subscribe({
      next: (response) => {
        if (response.response === 200) {

          response.dados_extras.map((x: any) => {
            if(x.progresso >= 100){
              this.concluidas++
            }
            else if(x.progresso < 100 && new Date(x.data_conclusao_prevista) < new Date()){
              this.atraso++
            }
            else if(x.progresso == 0 && new Date(x.data_conclusao_prevista) > new Date()){
              this.pendentes++
            }
            else if((x.progresso > 0 && x.progresso < 100) && new Date(x.data_conclusao_prevista) > new Date()){
              this.execucao++
            }
          })
        }
        else {
          alert(response.mensagem)
        }
      },
      error: (error) => {
        console.error('Erro: ', error);
      }
    });
  }

  openMetas(tipo_dashboard: string) {
    this.router.navigateByUrl("/telaPrincipal?tipo_dashboard=" + tipo_dashboard)
  }
  
}