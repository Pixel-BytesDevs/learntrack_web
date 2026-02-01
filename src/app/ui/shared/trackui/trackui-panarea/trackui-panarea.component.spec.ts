import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackuiPanareaComponent } from './trackui-panarea.component';

describe('TrackuiPanareaComponent', () => {
  let component: TrackuiPanareaComponent;
  let fixture: ComponentFixture<TrackuiPanareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackuiPanareaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackuiPanareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
