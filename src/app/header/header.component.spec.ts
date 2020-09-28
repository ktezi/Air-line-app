import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
//   let flightService: FlightsServices;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [AppModule,
        RouterTestingModule.withRoutes([]),
        RouterModule.forRoot([])],
      providers: [{
        provide: Store
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it('should login', () => {
    expect(component.signInWithFB).toBeTruthy();
  });

  it('should logout', () => {
    expect(component.signOut).toBeTruthy();
  });
});
