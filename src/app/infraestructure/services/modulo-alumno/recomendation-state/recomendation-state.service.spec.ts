import { TestBed } from '@angular/core/testing';

import { RecomendationStateService } from './recomendation-state.service';

describe('RecomendationStateService', () => {
  let service: RecomendationStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecomendationStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
