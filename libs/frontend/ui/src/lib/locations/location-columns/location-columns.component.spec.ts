import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationColumnsComponent } from './location-columns.component';

describe('LocationColumnsComponent', () => {
    let component: LocationColumnsComponent;
    let fixture: ComponentFixture<LocationColumnsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LocationColumnsComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(LocationColumnsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
