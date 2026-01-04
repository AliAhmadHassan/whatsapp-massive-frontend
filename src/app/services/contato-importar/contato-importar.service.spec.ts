import { TestBed, inject } from '@angular/core/testing';

import { ContatoImportarService } from './contato-importar.service';

describe('ContatoImportarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContatoImportarService]
    });
  });

  it('should be created', inject([ContatoImportarService], (service: ContatoImportarService) => {
    expect(service).toBeTruthy();
  }));
});
