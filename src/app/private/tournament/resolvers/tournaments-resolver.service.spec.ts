import { TestBed, inject } from '@angular/core/testing';

import { TournamentsResolverService } from './tournaments-resolver.service';

describe('TournamentsResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TournamentsResolverService]
    });
  });

  it('should be created', inject([TournamentsResolverService], (service: TournamentsResolverService) => {
    expect(service).toBeTruthy();
  }));
});
