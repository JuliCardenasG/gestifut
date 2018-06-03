import { TestBed, inject } from '@angular/core/testing';

import { LoggedUserResolverService } from './logged-user-resolver.service';

describe('LoggedUserResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggedUserResolverService]
    });
  });

  it('should be created', inject([LoggedUserResolverService], (service: LoggedUserResolverService) => {
    expect(service).toBeTruthy();
  }));
});
