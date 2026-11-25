import { Injectable } from '@angular/core';
import { WeightUnit, WeightValue } from '../models/weight-value.model';

const LB_KG_CONVERSION_FACTOR = 0.45359237;

@Injectable({
    providedIn: 'root',
})
export class UnitConverterService {
    convertWeight(source: WeightValue, targetUnit: WeightUnit): WeightValue {
        if (targetUnit === source.unit) {
            return {
                weight: source.weight,
                unit: source.unit,
            };
        }

        const weight =
            targetUnit === 'lb'
                ? this.convertToLb(source.weight)
                : this.convertToKg(source.weight);

        return {
            weight,
            unit: targetUnit,
        };
    }

    private convertToKg(value: number): number {
        return value * LB_KG_CONVERSION_FACTOR;
    }

    private convertToLb(value: number): number {
        return value / LB_KG_CONVERSION_FACTOR;
    }
}
