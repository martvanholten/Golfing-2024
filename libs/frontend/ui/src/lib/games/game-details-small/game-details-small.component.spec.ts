import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameDetailsSmallComponent } from './game-details-small.component';

describe('GameDetailsSmallComponent', () => {
    let component: GameDetailsSmallComponent;
    let fixture: ComponentFixture<GameDetailsSmallComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [GameDetailsSmallComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(GameDetailsSmallComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
