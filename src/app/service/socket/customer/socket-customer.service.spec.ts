import { TestBed, inject } from '@angular/core/testing';

import { SocketCustomerService } from './socket-customer.service';

describe('SocketCustomerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocketCustomerService]
    });
  });

  it('should be created', inject([SocketCustomerService], (service: SocketCustomerService) => {
    expect(service).toBeTruthy();
  }));
});
