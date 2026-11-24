import { Injectable, signal } from '@angular/core';
import { WeightUnit } from '../models/weight-value.model';

@Injectable({
    providedIn: 'root',
})
export class SettingsService {
    private readonly _currentUnit = signal<WeightUnit>(this.loadFromStorage());
    readonly currentUnit = this._currentUnit.asReadonly();

    setDefaultUnit(unit: WeightUnit) {
        this._currentUnit.set(unit);

        try {
            localStorage.setItem('weight-unit', unit);
        } catch (error) {
            console.error('Could not save the preferred unit.', error);
        }
    }

    private loadFromStorage(): WeightUnit {
        try {
            const unit = localStorage.getItem('weight-unit');

            if (unit === 'lb' || unit === 'kg') {
                return unit;
            }

            return 'lb';
        } catch (error) {
            console.error('Could not load the preferred unit.', error);
            return 'lb';
        }
    }
}
