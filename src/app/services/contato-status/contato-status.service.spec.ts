import { TestBed, inject } from '@angular/core/testing';

import { ContatoStatusService } from './contato-status.service';

describe('ContatoStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContatoStatusService]
    });
  });

  it('should be created', inject([ContatoStatusService], (service: ContatoStatusService) => {
    expect(service).toBeTruthy();
  }));
});
