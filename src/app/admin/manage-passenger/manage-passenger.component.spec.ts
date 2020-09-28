import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManagePassengerComponent } from './manage-passenger.component';
import { AppModule } from '../../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
describe('ManagePassengerComponent', () => {
  let component: ManagePassengerComponent;
  let fixture: ComponentFixture<ManagePassengerComponent>;
  // let flightService: FlightsServices;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePassengerComponent ],
      imports:[AppModule,
        RouterTestingModule.withRoutes([]),
        RouterModule.forRoot([])],
      providers:[{
        provide:Store
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
