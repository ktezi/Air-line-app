import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { CheckInComponent } from './check-in.component';

describe('CheckInComponent', () => {
  let component: CheckInComponent;
  let fixture: ComponentFixture<CheckInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckInComponent ],
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
    fixture = TestBed.createComponent(CheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return midline if value is not A/B/C/D/E/F', () => {
    const returnedValue = component.getClassname('1', '');
    expect(returnedValue).toBe('midline');
  });
  it('should return available if ischecked is true', () => {
    const returnedValue = component.getClassname('1', 'A');
    expect(returnedValue).toBe('available');
  });
 
});

