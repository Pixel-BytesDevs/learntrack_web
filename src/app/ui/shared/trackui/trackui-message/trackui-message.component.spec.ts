import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackuiMessageComponent } from './trackui-message.component';

describe('TrackuiMessageComponent', () => {
  let component: TrackuiMessageComponent;
  let fixture: ComponentFixture<TrackuiMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackuiMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackuiMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
