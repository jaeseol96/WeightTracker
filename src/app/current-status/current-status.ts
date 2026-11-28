import { Component, computed, inject, input } from '@angular/core';
import { WeightEntry } from '../models/weight-entry.model';
import { WeightUnit } from '../models/weight-value.model';
import { DatePipe, DecimalPipe } from '@angular/common';
import { UnitConverterService } from '../services/unit-converter-service';
import {WeightEntryService} from '../services/weight-entry.service';

@Component({
    imports: [DatePipe, DecimalPipe],
    selector: 'app-current-status',
    styleUrl: './current-status.scss',
    templateUrl: './current-status.html',
})
export class CurrentStatus {
    private readonly weightEntryService = inject(WeightEntryService);
    unitConvertService = inject(UnitConverterService);
    currentWeight = this.weightEntryService.latestEntry;
    currentUnit = input.required<WeightUnit>();

    convertedWeight = computed(() => {
        const entry = this.currentWeight();

        if (entry === undefined) {
            return undefined;
        }

        return this.unitConvertService.convertWeight(entry, this.currentUnit());
    });

    weightDifference = computed(() => {
        const current = this.currentWeight()
        const prev = this.weightEntryService.previousEntry();

        if (current === undefined || prev === undefined) {
            return undefined;
        }

        return current.weight - prev.weight;
    })
}
