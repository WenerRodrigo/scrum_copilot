import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-dashboard',
  templateUrl: './tela-dashboard.component.html',
  styleUrls: ['./tela-dashboard.component.css']
})
export class TelaDashboardComponent implements OnInit {
  porcentagemConcluida: number = 0

  constructor() {}

  ngOnInit(): void {
    const totalPorcentagem = 90;

    const updateProgress = () => {
      if (this.porcentagemConcluida < totalPorcentagem) {
        this.porcentagemConcluida++;
        setTimeout(updateProgress, 20);
      }
    }

    updateProgress();
  }
  
}