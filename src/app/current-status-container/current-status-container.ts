import {Component, input} from '@angular/core';
import {WeightEntry} from '../models/weight-entry.model';
import {DatePipe} from '@angular/common';

@Component({
    imports: [
        DatePipe
    ],
    selector: 'app-current-status-container',
    styleUrl: './current-status-container.scss',
    templateUrl: './current-status-container.html',
})
export class CurrentStatusContainer {
    currentWeight = input.required<WeightEntry>();
}
