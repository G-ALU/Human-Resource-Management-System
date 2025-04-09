import { TestBed } from '@angular/core/testing';

import { PerformanceanalyticsService } from './performanceanalytics.service';

describe('PerformanceanalyticsService', () => {
  let service: PerformanceanalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerformanceanalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
