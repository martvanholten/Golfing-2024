import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationDetailsSmallComponent } from './location-details-small.component';

describe('LocationDetailsSmallComponent', () => {
    let component: LocationDetailsSmallComponent;
    let fixture: ComponentFixture<LocationDetailsSmallComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LocationDetailsSmallComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(LocationDetailsSmallComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
