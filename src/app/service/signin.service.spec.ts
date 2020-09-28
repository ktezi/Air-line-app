import { TestBed } from '@angular/core/testing';
import { SigninService } from './signin.service';
import { Store } from '@ngrx/store';
import { AppModule } from '../app.module';

describe('SigninService', () => {
  let service: SigninService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [{
        provide: Store
      }, SigninService]
    });
    service = TestBed.inject(SigninService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
