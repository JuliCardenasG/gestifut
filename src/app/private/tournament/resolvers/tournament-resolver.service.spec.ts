import { TestBed, inject } from '@angular/core/testing';

import { TournamentResolverService } from './tournament-resolver.service';

describe('TournamentResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TournamentResolverService]
    });
  });

  it('should be created', inject([TournamentResolverService], (service: TournamentResolverService) => {
    expect(service).toBeTruthy();
  }));
});
