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
      {
        nomeMeta: 'Meta 1',
        meta: '10',
        dataInicio: new Date('2021-01-01'),
        dataFim: new Date('2021-01-31'),
        responsavel: 'João',
        status: 'Em andamento'
      },
      {
        nomeMeta: 'Meta 2',
        meta: '20',
        dataInicio: new Date('2021-02-01'),
        dataFim: new Date('2021-02-28'),
        responsavel: 'Maria',
        status: 'Em andamento'
      },
      {
        nomeMeta: 'Meta 3',
        meta: '30',
        dataInicio: new Date('2021-03-01'),
        dataFim: new Date('2021-03-31'),
        responsavel: 'José',
        status: 'Em andamento'
      },
    ];
  }

  // applyFilter() {
  //   if (this.searchText) {
  //     this.metas = this.metas.filter(meta =>
  //       meta.nomeMeta.toLowerCase().includes(this.searchText.toLowerCase()) ||
  //       meta.meta.toLowerCase().includes(this.searchText.toLowerCase())
  //     );
  //   } else {
  //     this.metas = [];
  //   }
  // }

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
  responsavel: string;
  status: string;
}

