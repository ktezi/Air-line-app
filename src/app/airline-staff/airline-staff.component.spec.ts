import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AirlineStaffComponent } from './airline-staff.component';
import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
describe('AirlineStaffComponent', () => {
  let component: AirlineStaffComponent;
  let fixture: ComponentFixture<AirlineStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AirlineStaffComponent],
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
    fixture = TestBed.createComponent(AirlineStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
