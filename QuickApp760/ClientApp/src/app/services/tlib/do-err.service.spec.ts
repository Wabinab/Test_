import { TestBed } from '@angular/core/testing';

import { DoErrService } from './do-err.service';

describe('DoErrService', () => {
  let service: DoErrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoErrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
