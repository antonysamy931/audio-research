import { TestBed, inject } from '@angular/core/testing';

import { SocketBranchService } from './socket-branch.service';

describe('SocketBranchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocketBranchService]
    });
  });

  it('should be created', inject([SocketBranchService], (service: SocketBranchService) => {
    expect(service).toBeTruthy();
  }));
});
