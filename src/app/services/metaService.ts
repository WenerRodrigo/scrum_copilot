import { Injectable } from '@angular/core';

@Injectable()
export class MetaService {
  private metas: Meta[] = [];

  getMetas() {
    return this.metas;
  }

  adicionarMeta(meta: Meta) {
    this.metas.push(meta);
  }
}

interface Meta {
  nomeMeta: string;
  meta: string;
  dataInicio: Date;
  dataFim: Date;
}
