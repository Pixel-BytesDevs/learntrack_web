import { TestBed } from '@angular/core/testing';

import { OaViewerService } from './oa-viewer.service';

describe('OaViewerService', () => {
  let service: OaViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OaViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
