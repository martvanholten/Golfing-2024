import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameColumnsComponent } from './game-columns.component';

describe('GameColumnsComponent', () => {
    let component: GameColumnsComponent;
    let fixture: ComponentFixture<GameColumnsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [GameColumnsComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(GameColumnsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
