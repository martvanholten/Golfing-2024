import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailsSmallComponent } from './user-details-small.component';

describe('UserDetailsSmallComponent', () => {
    let component: UserDetailsSmallComponent;
    let fixture: ComponentFixture<UserDetailsSmallComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UserDetailsSmallComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(UserDetailsSmallComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
