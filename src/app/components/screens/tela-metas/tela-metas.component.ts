import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data } from '@angular/router';
import { EndPointService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tela-metas',
  templateUrl: './tela-metas.component.html',
  styleUrls: ['./tela-metas.component.css']
})

export class TelaMetasComponent implements OnInit {
  meuFormulario!: FormGroup;
  metas: Meta[] = [];
  colaboradores: Colaborador[] = [];
  searchText: string = '';
  metaEmEdicao: string | null = null;
  isPopupVisible: boolean = false;
  originalMetas: any[] = [];
  identificador_meta: string = '';
  identificador_usuario: string;
  supervisor: boolean;
  etapa: any;

  constructor(private formBuilder: FormBuilder, private authService: EndPointService, private route: ActivatedRoute) {
    this.meuFormulario = this.formBuilder.group({
      titulo_etapa: ['', Validators.required],
      descricao: ['', Validators.required],
      identificador_responsavel: ['', Validators.required],
      data_conclusao_prevista: [''],
    });

    this.identificador_usuario = localStorage.getItem('identificador_usuario') || '';
    this.supervisor = Boolean(localStorage.getItem('supervisor')) || false;

    this.colaboradores = [
      { identificador_usuario: '00000000-0000-0000-0000-000000000000', nome_completo: 'Nenhum' },
      { identificador_usuario: '5430F498-F28E-432B-882D-45592291B57A', nome_completo: 'Wener' },
      { identificador_usuario: 'E3D5BB9A-3C93-433A-93BF-40166F37150D', nome_completo: 'RAPAZ' }
    ];

    this.route.queryParams.subscribe(params => {
      this.identificador_meta = params['identificador_meta'];
    })

    this.identificador_usuario = localStorage.getItem('identificador_usuario') || '';
    this.supervisor = Boolean(localStorage.getItem('supervisor')) || false;
  }

  openPopup() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  submitForm() {
    const data: Data = {
      titulo_etapa: this.meuFormulario.value.titulo_etapa,
      descricao: this.meuFormulario.value.descricao,
      identificador_responsavel: this.meuFormulario.value.identificador_responsavel,
      // data_conclusao: this.meuFormulario.value.data_conclusao,
      data_conclusao_prevista: this.meuFormulario.value.data_conclusao_prevista,
      status: 'Em Andamento', 
    };

    if (this.metaEmEdicao) {
      this.authService.criarEtapa(this.identificador_meta, data).subscribe({
        next: (response) => {
          if (response.response === 200) {
            console.log('Cadastro realizado com sucesso');
            this.closePopup();
            window.location.reload();
          } else {
            console.log('aqui', response);
            alert(response.mensagem);
          }
        },
        error: (error) => {
          console.error('Erro ao cadastrar:', error);
        }
      });
    } else if (this.metaEmEdicao === null && this.meuFormulario.valid) {
      this.authService.criarEtapa(this.identificador_meta, data).subscribe({
        next: (response) => {
          if (response.response === 200) {
            console.log('Cadastro realizado com sucesso');
            this.closePopup();
            window.location.reload();


            this.metas = [...this.metas, response.novaEtapa];
          } else {
            console.log(response);
            alert(response.mensagem);
          }
        },
        error: (error) => {
          console.error('Erro ao cadastrar:', error);
        }
      });
    } else {
      console.log(data);
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


  ngOnInit(): void {
    this.authService.getEtapas(this.identificador_meta, this.identificador_usuario, this.supervisor).subscribe({
      next: (response) => {
        if (response.response === 200) {
          //this.metaSalva = true;
          response.dados_extras.forEach((meta: any) => {
            meta.data_conclusao_prevista = new Date(meta.data_conclusao_prevista).toISOString().split('T')[0]
            this.originalMetas.push(meta)
          });

          this.metas = [...this.originalMetas];

          console.log(response.dados_extras)
        }
        else {
          console.log('erro na resposta', response)
          alert(response.mensagem)
        }
      },
      error: (error) => {
        console.error('Erro ao cadastrar:', error);
      }
    });
  }

  encontrarNomeResponsavel(identificador: string): string {
    const colaborador = this.colaboradores.find(c => c.identificador_usuario === identificador);
    return colaborador ? colaborador.nome_completo : '';
  }

  editarEtapa(index: string) {
    this.metaEmEdicao = index;
    this.openPopup();
  }

  removerEtapa(index: string) {
    if (confirm('Deseja realmente remover a meta?')) {
      this.authService.deleteEtapa(index).subscribe({
        next: (response) => {
          if (response.response === 200) {
            //alert('Deseja realmente deletar a meta?');
            //window.location.reload();
            this.metas = this.metas.filter(meta => meta.identificador_etapa !== index);
          }
          else {
            console.log(response)
            alert(response.mensagem)
          }
        },
        error: (error) => {
          console.error('Erro ao deletar:', error);
        }
      });
    }
  }
}



interface Meta {
  identificador_etapa: string;
  titulo_etapa: string;
  descricao: string;
  data_conclusao:Date;
  data_conclusao_prevista: Date;
  identificador_responsavel: string;
  status: string;
}



interface Colaborador {
  identificador_usuario: string;
  nome_completo: string;
}

