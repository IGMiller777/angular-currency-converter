import { TestBed } from '@angular/core/testing';

import { FlagsApiService } from './flags-api.service';

describe('FlagsApiService', () => {
  let service: FlagsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlagsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
