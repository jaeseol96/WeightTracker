import { Component, input } from '@angular/core';
import { WeightEntry } from '../models/weight-entry.model';
import { DatePipe } from '@angular/common';

@Component({
    imports: [DatePipe],
    selector: 'app-current-status',
    styleUrl: './current-status.scss',
    templateUrl: './current-status.html',
})
export class CurrentStatus {
    currentWeight = input.required<WeightEntry>();
}
