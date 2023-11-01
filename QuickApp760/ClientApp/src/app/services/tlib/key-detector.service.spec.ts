import { TestBed } from '@angular/core/testing';

import { KeyDetectorService } from './key-detector.service';

describe('KeyDetectorService', () => {
  let service: KeyDetectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyDetectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
