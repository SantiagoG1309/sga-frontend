import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalCasesComponent } from './legal-cases.component';

describe('LegalCasesComponent', () => {
  let component: LegalCasesComponent;
  let fixture: ComponentFixture<LegalCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalCasesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LegalCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
