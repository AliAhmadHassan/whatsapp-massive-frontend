import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatoImportarComponent } from './contato-importar.component';

describe('ContatoImportarComponent', () => {
  let component: ContatoImportarComponent;
  let fixture: ComponentFixture<ContatoImportarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContatoImportarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContatoImportarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
