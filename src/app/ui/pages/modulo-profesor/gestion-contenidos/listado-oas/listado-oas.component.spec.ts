import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoOAsComponent } from './listado-oas.component';

describe('ListadoOAsComponent', () => {
  let component: ListadoOAsComponent;
  let fixture: ComponentFixture<ListadoOAsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoOAsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoOAsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
