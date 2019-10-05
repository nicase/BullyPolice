import { TestBed } from '@angular/core/testing';

import { BulliesService } from './bullies.service';

describe('BulliesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BulliesService = TestBed.get(BulliesService);
    expect(service).toBeTruthy();
  });
});
