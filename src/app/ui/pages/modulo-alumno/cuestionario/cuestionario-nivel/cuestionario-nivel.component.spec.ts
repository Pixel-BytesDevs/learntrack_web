import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuestionarioNivelComponent } from './cuestionario-nivel.component';

describe('CuestionarioNivelComponent', () => {
  let component: CuestionarioNivelComponent;
  let fixture: ComponentFixture<CuestionarioNivelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuestionarioNivelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuestionarioNivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
