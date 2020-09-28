import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlightListComponent } from './flight-list.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store } from '@ngrx/store';
describe('FlightListComponent', () => {
  let component: FlightListComponent;
  let fixture: ComponentFixture<FlightListComponent>;
//   let flightService: FlightsServices;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightListComponent ],
      imports:[
        HttpClientTestingModule,
        RouterTestingModule,
        StoreModule.forRoot({})
    ],
      providers: [
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data from api', () => {
    const res = component.getData;
    expect(res).toBeTruthy();
  });
});
