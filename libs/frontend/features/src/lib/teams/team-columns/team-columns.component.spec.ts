import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamColumnsComponent } from './team-columns.component';

describe('TeamColumnsComponent', () => {
    let component: TeamColumnsComponent;
    let fixture: ComponentFixture<TeamColumnsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TeamColumnsComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TeamColumnsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
