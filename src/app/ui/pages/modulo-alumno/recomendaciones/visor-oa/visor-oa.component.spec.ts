import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorOaComponent } from './visor-oa.component';

describe('VisorOaComponent', () => {
  let component: VisorOaComponent;
  let fixture: ComponentFixture<VisorOaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisorOaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisorOaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
