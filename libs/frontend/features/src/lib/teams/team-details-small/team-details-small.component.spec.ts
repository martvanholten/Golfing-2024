import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamDetailsSmallComponent } from './team-details-small.component';

describe('TeamDetailsSmallComponent', () => {
    let component: TeamDetailsSmallComponent;
    let fixture: ComponentFixture<TeamDetailsSmallComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TeamDetailsSmallComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TeamDetailsSmallComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
