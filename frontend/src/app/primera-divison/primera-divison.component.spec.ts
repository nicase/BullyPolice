import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeraDivisonComponent } from './primera-divison.component';

describe('PrimeraDivisonComponent', () => {
  let component: PrimeraDivisonComponent;
  let fixture: ComponentFixture<PrimeraDivisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeraDivisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeraDivisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
