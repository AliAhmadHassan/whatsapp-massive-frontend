import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensagemNewComponent } from './mensagem-new.component';

describe('MensagemNewComponent', () => {
  let component: MensagemNewComponent;
  let fixture: ComponentFixture<MensagemNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensagemNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensagemNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
