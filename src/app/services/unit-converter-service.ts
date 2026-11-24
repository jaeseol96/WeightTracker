import { Injectable } from '@angular/core';
import { WeightEntry } from '../models/weight-entry.model';
import { WeightUnit, WeightValue } from '../models/weight-value.model';

const LB_KG_CONVERSION_FACTOR = 0.45359237;

@Injectable({
    providedIn: 'root',
})
export class UnitConverterService {
    convertWeight(entry: WeightEntry, currUnit: WeightUnit): WeightValue {
        if (currUnit === entry.unit) {
            return {
                weight: entry.weight,
                unit: entry.unit,
            };
        }

        const weight =
            currUnit === 'lb' ? this.convertToLb(entry.weight) : this.convertToKg(entry.weight);

        return {
            weight,
            unit: currUnit,
        };
    }

    private convertToKg(value: number): number {
        return value * LB_KG_CONVERSION_FACTOR;
    }

    private convertToLb(value: number): number {
        return value / LB_KG_CONVERSION_FACTOR;
    }
}
