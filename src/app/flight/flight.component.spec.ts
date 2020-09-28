import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlightComponent } from './flight.component';
import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';

describe('FlightComponent', () => {
  let component: FlightComponent;
  let fixture: ComponentFixture<FlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightComponent ],
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
    fixture = TestBed.createComponent(FlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
