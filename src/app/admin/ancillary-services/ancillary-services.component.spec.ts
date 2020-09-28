import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AncillaryServicesComponent } from './ancillary-services.component';
import { AppModule } from '../../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
describe('AncillaryServicesComponent', () => {
    let component: AncillaryServicesComponent;
    let fixture: ComponentFixture<AncillaryServicesComponent>;
    //   let flightService: FlightsServices;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AncillaryServicesComponent],
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
        fixture = TestBed.createComponent(AncillaryServicesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
