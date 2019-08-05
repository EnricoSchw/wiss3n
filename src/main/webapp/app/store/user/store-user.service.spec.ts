import { TestBed, inject } from '@angular/core/testing';

import { StoreUserService } from './store-user.service';

describe('StoreUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreUserService]
    });
  });

  it('should be created', inject([StoreUserService], (service: StoreUserService) => {
    expect(service).toBeTruthy();
  }));
});
