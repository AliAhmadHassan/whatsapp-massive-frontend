import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampanhaNewComponent } from './campanha-new.component';

describe('CampanhaNewComponent', () => {
  let component: CampanhaNewComponent;
  let fixture: ComponentFixture<CampanhaNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampanhaNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampanhaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
