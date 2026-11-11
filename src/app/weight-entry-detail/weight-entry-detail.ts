import { Component, input } from '@angular/core';
import { WeightEntry } from '../models/weight-entry.model';
import { DatePipe } from '@angular/common';
import { LucideMousePointerClick } from '@lucide/angular';

@Component({
    imports: [DatePipe, LucideMousePointerClick],
    selector: 'app-weight-entry-detail',
    styleUrl: './weight-entry-detail.scss',
    templateUrl: './weight-entry-detail.html',
})
export class WeightEntryDetail {
    selectedEntry = input<WeightEntry | null>(null);
}
