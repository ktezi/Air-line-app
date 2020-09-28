import { TestBed } from '@angular/core/testing';
import { AuthGuardGuard } from './auth-guard.guard';
import { AppModule } from './app.module';
import { Store } from '@ngrx/store';

describe('AuthGuardGuard', () => {
  let guard: AuthGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [{
        provide: Store
      }, AuthGuardGuard]
    });
    guard = TestBed.inject(AuthGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
