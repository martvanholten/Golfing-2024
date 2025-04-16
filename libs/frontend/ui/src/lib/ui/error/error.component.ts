import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorService } from '@avans-nx-workshop/frontend/features';

@Component({
    selector: 'avans-nx-workshop-error',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnDestroy{
    errorMessage?: string

    constructor(
        private errorService: ErrorService
    ){}
    ngOnDestroy(): void {
        this.errorMessage = '';
    }

    ngOnInit(): void {
        console.log(this.errorService.errorMessage)
        this.errorMessage = this.errorService.errorMessage
    }
}
