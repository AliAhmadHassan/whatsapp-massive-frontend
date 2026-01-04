import { TestBed, inject } from '@angular/core/testing';

import { TipoArquivoService } from './tipo-arquivo.service';

describe('TipoArquivoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipoArquivoService]
    });
  });

  it('should be created', inject([TipoArquivoService], (service: TipoArquivoService) => {
    expect(service).toBeTruthy();
  }));
});
