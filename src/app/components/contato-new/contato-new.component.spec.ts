import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatoNewComponent } from './contato-new.component';

describe('ContatoNewComponent', () => {
  let component: ContatoNewComponent;
  let fixture: ComponentFixture<ContatoNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContatoNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContatoNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
