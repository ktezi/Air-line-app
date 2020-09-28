import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
describe('AncillaryServicesComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
//   let flightService: FlightsServices;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminComponent ],
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
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
