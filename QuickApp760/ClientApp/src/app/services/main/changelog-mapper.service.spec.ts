import { TestBed } from '@angular/core/testing';

import { ChangelogMapperService } from './changelog-mapper.service';

describe('ChangelogMapperService', () => {
  let service: ChangelogMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangelogMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
