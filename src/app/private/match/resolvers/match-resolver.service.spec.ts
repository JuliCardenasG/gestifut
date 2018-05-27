import { TestBed, inject } from '@angular/core/testing';

import { MatchResolverService } from './match-resolver.service';

describe('MatchResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchResolverService]
    });
  });

  it('should be created', inject([MatchResolverService], (service: MatchResolverService) => {
    expect(service).toBeTruthy();
  }));
});
