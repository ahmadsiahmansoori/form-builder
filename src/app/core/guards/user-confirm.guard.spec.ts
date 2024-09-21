import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userConfirmGuard } from './user-confirm.guard';

describe('userConfirmGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userConfirmGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
