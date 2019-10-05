import { TestBed } from '@angular/core/testing';

import { PremierLeagueService } from './premier-league.service';

describe('PremierLeagueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PremierLeagueService = TestBed.get(PremierLeagueService);
    expect(service).toBeTruthy();
  });
});
