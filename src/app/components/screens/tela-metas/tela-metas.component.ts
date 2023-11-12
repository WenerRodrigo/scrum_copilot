import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Data } from '@angular/router';
import { EndPointService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tela-metas',
  templateUrl: './tela-metas.component.html',
  styleUrls: ['./tela-metas.component.css']
})

export class TelaMetasComponent implements OnInit {
  meuFormulario!: FormGroup;
  metas: Meta[] = [];
  searchText: string = '';
  metaEmEdicao: string | null = null;
  isPopupVisible: boolean = false;
  originalMetas: any[] = [];

  constructor( private authService: EndPointService) {
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
        status: 'Concluido'
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

  openPopup() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  submitForm() {
    const data: Data = ({
      titulo_meta: this.meuFormulario.value.titulo_meta,
      descricao: this.meuFormulario.value.descricao,
      data_inicio: this.meuFormulario.value.data_inicio,
      data_conclusao_prevista: this.meuFormulario.value.data_conclusao_prevista
    })
    console.log(data)

    if (this.metaEmEdicao !== null) {
      this.authService.atualizarMeta(this.metaEmEdicao, data).subscribe({
        next: (response) => {
          if (response.response === 200) {
            console.log('Cadastro realizado com sucesso');
            this.closePopup();
            window.location.reload();
          }
          else {
            console.log(response)
            alert(response.mensagem)
          }
        },
        error: (error) => {
          console.error('Erro ao cadastrar:', error);
        }
      });
    }
    else if (this.metaEmEdicao === null && this.meuFormulario.valid) {

      this.authService.criarMeta(data).subscribe({
        next: (response) => {
          if (response.response === 200) {
            console.log('Cadastro realizado com sucesso');
            this.closePopup();
            window.location.reload();
          }
          else {
            console.log(response)
            alert(response.mensagem)
          }
        },
        error: (error) => {
          console.error('Erro ao cadastrar:', error);
        }
      });
      const formValues = this.meuFormulario.value;
      this.metas.push(formValues);
    }
    else {
      console.log(data)
    }
  }


  applyFilter() {
    if (this.searchText.trim() !== '') {
      this.metas = this.originalMetas.filter(meta =>
        meta.titulo_meta.toLowerCase().includes(this.searchText.toLowerCase()) ||
        meta.descricao.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.metas = [...this.originalMetas];
    }
  }


  ngOnInit(): void { }

  editar(meta: Meta) {
    this.metaEmEdicao = meta.nomeMeta;
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

