import { Component, input, output } from '@angular/core';
import { WeightUnit } from '../models/weight-value.model';

@Component({
    imports: [],
    selector: 'app-unit-switch',
    styleUrl: './unit-switch.scss',
    templateUrl: './unit-switch.html',
})
export class UnitSwitch {
    currentUnit = input<WeightUnit>();
    unitChange = output<WeightUnit>();
}
