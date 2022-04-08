import { TestBed } from '@angular/core/testing';

import { LifeCycleService } from './life-cycle.service';

describe('LifeCycleService', () => {
  let service: LifeCycleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LifeCycleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
