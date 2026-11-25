import { Component, computed, inject, input, output } from '@angular/core';
import { WeightEntry } from '../models/weight-entry.model';
import { DatePipe, DecimalPipe } from '@angular/common';
import { LucideMousePointerClick, LucideTrash, LucideSquarePen } from '@lucide/angular';
import { UnitConverterService } from '../services/unit-converter-service';
import { WeightUnit } from '../models/weight-value.model';

@Component({
    imports: [DatePipe, DecimalPipe, LucideMousePointerClick, LucideTrash, LucideSquarePen],
    selector: 'app-weight-entry-detail',
    styleUrl: './weight-entry-detail.scss',
    templateUrl: './weight-entry-detail.html',
})
export class WeightEntryDetail {
    unitConvertService = inject(UnitConverterService);
    selectedEntry = input<WeightEntry | null>(null);
    toDelete = output<WeightEntry>();
    currentUnit = input.required<WeightUnit>();

    convertedWeight = computed(() => {
        const entry = this.selectedEntry();

        if (!entry) {
            return null;
        }

        return this.unitConvertService.convertWeight(entry, this.currentUnit());
    });

    protected onDelete() {
        const entry = this.selectedEntry();
        if (entry) {
            this.toDelete.emit(entry);
        }
    }
}
