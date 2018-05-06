import { TestBed, inject } from '@angular/core/testing';

import { BranchUserService } from './branch-user.service';

describe('BranchUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BranchUserService]
    });
  });

  it('should be created', inject([BranchUserService], (service: BranchUserService) => {
    expect(service).toBeTruthy();
  }));
});
