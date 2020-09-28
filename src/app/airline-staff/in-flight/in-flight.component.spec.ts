import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { InFlightComponent } from './in-flight.component';

describe('InFlightComponent', () => {
  let component: InFlightComponent;
  let fixture: ComponentFixture<InFlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InFlightComponent ],
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
    fixture = TestBed.createComponent(InFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
