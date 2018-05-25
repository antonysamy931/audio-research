import { TestBed, inject } from '@angular/core/testing';

import { CustomerUserService } from './customer-user.service';

describe('CustomerUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerUserService]
    });
  });

  it('should be created', inject([CustomerUserService], (service: CustomerUserService) => {
    expect(service).toBeTruthy();
  }));
});
