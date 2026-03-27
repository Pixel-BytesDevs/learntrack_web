import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrafoCompetenciasComponent } from './grafo-competencias.component';

describe('GrafoCompetenciasComponent', () => {
  let component: GrafoCompetenciasComponent;
  let fixture: ComponentFixture<GrafoCompetenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrafoCompetenciasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrafoCompetenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
