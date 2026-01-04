import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoteNewComponent } from './lote-new.component';

describe('LoteNewComponent', () => {
  let component: LoteNewComponent;
  let fixture: ComponentFixture<LoteNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoteNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoteNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
