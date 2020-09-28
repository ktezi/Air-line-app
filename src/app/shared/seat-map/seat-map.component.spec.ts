import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { SeatMapComponent } from './seat-map.component';
import { AppModule } from '../../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
describe('SeatMapComponent', () => {
  const fakeActivatedRoute = {
    snapshot: { data:  {}}
  } as ActivatedRoute;

  let component: SeatMapComponent;
  let fixture: ComponentFixture<SeatMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatMapComponent ],
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
    fixture = TestBed.createComponent(SeatMapComponent);
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
