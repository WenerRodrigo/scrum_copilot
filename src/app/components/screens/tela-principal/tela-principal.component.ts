import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tela-principal',
  templateUrl: './tela-principal.component.html',
  styleUrls: ['./tela-principal.component.css']
})
export class TelaPrincipalComponent implements OnInit {
  meuFormulario: FormGroup;
  metas: any[] = [];
  metaEmEdicao: number | null = null;
  metaSalva: boolean = false;
  isPopupVisible: boolean = false;


  constructor(private formBuilder: FormBuilder) {
    this.meuFormulario = this.formBuilder.group({
      meta: ['', Validators.required],
      dataInicio: ['', Validators.required],
      dataFim: ['', Validators.required],
      nomeMeta: [''],
    })
  }


  ngOnInit(): void { }

  openPopup() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  submitForm() {
    if (this.metaEmEdicao !== null) {
      this.salvarMeta();
    } else if (this.meuFormulario.valid) {
      const formValues = this.meuFormulario.value;
      formValues.nomeMeta = this.meuFormulario.get('nomeMeta')?.value;
      this.metas.push(formValues);
      this.resetForm();
      this.metaSalva = true;
      this.closePopup();
    }
  }


  editar(index: number) {
    this.metaEmEdicao = index;
    this.meuFormulario.patchValue(this.metas[index]);
    this.openPopup();
  }

  salvar() {
    if (this.metaEmEdicao !== null && this.meuFormulario.valid) {
      this.metas[this.metaEmEdicao] = this.meuFormulario.value;
      this.resetForm();
      this.metaEmEdicao = null;
    }
  }

  salvarMeta() {
    if (this.metaEmEdicao !== null && this.meuFormulario.valid) {
      this.metas[this.metaEmEdicao] = this.meuFormulario.value;
      this.resetForm();
      this.metaEmEdicao = null;
    }
  }

  isListaMetasVazia(): boolean {
    return this.metas.length === 0;

  }

  remover(index: number) {
    if (confirm('Deseja realmente remover a meta?')) {
      this.metas.splice(index, 1);
      this.resetForm();

      if (this.isListaMetasVazia()) {
        this.metaSalva = false;
      }
    }
  }

  resetForm() {
    this.meuFormulario.reset();
    this.metaEmEdicao = null;
  }

  // getProgressBarStyle(progresso: number) {
  //   if (progresso < 40) {
  //     return { 'width': progresso + '%', 'background-color': 'red' };
  //   } else {
  //     return { 'width': progresso + '%', 'background-color': '#4CAF50' };
  //   }
  // }
}
