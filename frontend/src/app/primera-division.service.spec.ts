import { TestBed } from '@angular/core/testing';

import { PrimeraDivisionService } from './primera-division.service';

describe('PrimeraDivisionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrimeraDivisionService = TestBed.get(PrimeraDivisionService);
    expect(service).toBeTruthy();
  });
});
