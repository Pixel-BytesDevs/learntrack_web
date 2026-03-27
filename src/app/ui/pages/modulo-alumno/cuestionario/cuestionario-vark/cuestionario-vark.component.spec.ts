import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuestionarioVarkComponent } from './cuestionario-vark.component';

describe('CuestionarioVarkComponent', () => {
  let component: CuestionarioVarkComponent;
  let fixture: ComponentFixture<CuestionarioVarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuestionarioVarkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuestionarioVarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
