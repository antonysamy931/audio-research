import { TestBed, inject } from '@angular/core/testing';

import { SocketInitService } from './socket-init.service';

describe('SocketInitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocketInitService]
    });
  });

  it('should be created', inject([SocketInitService], (service: SocketInitService) => {
    expect(service).toBeTruthy();
  }));
});
