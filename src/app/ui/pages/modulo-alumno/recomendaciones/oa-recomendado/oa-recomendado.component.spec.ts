import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OaRecomendadoComponent } from './oa-recomendado.component';

describe('OaRecomendadoComponent', () => {
  let component: OaRecomendadoComponent;
  let fixture: ComponentFixture<OaRecomendadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OaRecomendadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OaRecomendadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
