import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tela-metas',
  templateUrl: './tela-metas.component.html',
  styleUrls: ['./tela-metas.component.css']
})

export class TelaMetasComponent implements OnInit {
  metas: Meta[] = [];
  searchText: string = '';
  metaEmEdicao: Meta | null = null;

  constructor() {
    this.metas = [
      { nomeMeta: 'Trilha FrontEnd', meta: 'Dev Full Stack Jr', dataInicio: new Date('2023-01-01'), dataFim: new Date('2023-01-31') },
      { nomeMeta: 'Trilha BackEnd', meta: 'BackEnd Jr', dataInicio: new Date('2023-02-01'), dataFim: new Date('2023-02-28') },
      { nomeMeta: 'Angular Js 15', meta: 'Especializar em Angular', dataInicio: new Date('2023-03-01'), dataFim: new Date('2023-03-31') },
    ];
  }

  applyFilter() {
    if (this.searchText) {
      this.metas = this.metas.filter(meta =>
        meta.nomeMeta.toLowerCase().includes(this.searchText.toLowerCase()) ||
        meta.meta.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.metas = [
        { nomeMeta: 'Trilha FrontEnd', meta: 'Dev Full Stack Jr', dataInicio: new Date('2023-01-01'), dataFim: new Date('2023-01-31') },
        { nomeMeta: 'Trilha BackEnd', meta: 'BackEnd Jr', dataInicio: new Date('2023-02-01'), dataFim: new Date('2023-02-28') },
        { nomeMeta: 'Angular Js 15', meta: 'Especializar em Angular', dataInicio: new Date('2023-03-01'), dataFim: new Date('2023-03-31') },
      ];
    }
  }

  ngOnInit(): void { }

  editar(meta: Meta) {
    this.metaEmEdicao = meta;
  }

  remover(index: number) {
    if (confirm('Deseja realmente remover a meta?')) {
      this.metas.splice(index, 1);
    }
  }
}



interface Meta {
  nomeMeta: string;
  meta: string;
  dataInicio: Date;
  dataFim: Date;
}

