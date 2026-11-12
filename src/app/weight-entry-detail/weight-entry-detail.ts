import {Component, input, output} from '@angular/core';
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
    toDelete = output<WeightEntry>();

    protected onDelete() {
        const entry = this.selectedEntry();
        if (entry) {
            this.toDelete.emit(entry);
        }
    }
}
