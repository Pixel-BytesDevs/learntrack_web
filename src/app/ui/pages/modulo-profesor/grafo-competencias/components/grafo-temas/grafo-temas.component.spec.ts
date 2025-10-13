import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrafoTemasComponent } from './grafo-temas.component';

describe('GrafoTemasComponent', () => {
  let component: GrafoTemasComponent;
  let fixture: ComponentFixture<GrafoTemasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrafoTemasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrafoTemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
