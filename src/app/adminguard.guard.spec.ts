import { TestBed } from '@angular/core/testing';
import { AdminguardGuard } from './adminguard.guard';
import { AppModule } from './app.module';
import { Store } from '@ngrx/store';

describe('AdminguardGuard', () => {
  let guard: AdminguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [{
        provide: Store
      }, AdminguardGuard]
    });
    guard = TestBed.inject(AdminguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
