import { Component, Input } from '@angular/core';
import { WeightEntry } from '../models/weight-entry.model';

@Component({
    imports: [],
    selector: 'app-current-status',
    styleUrl: './current-status.scss',
    templateUrl: './current-status.html',
})
export class CurrentStatus {
    @Input() currentWeight!: WeightEntry;
}
