import { Component, signal } from '@angular/core';
import { WeightInputForm } from './weight-input-form/weight-input-form';
import { WeightChart } from './weight-chart/weight-chart';
import { WeightEntry } from './models/weight-entry.model';

@Component({
    imports: [WeightInputForm, WeightChart],
    selector: 'app-root',
    styleUrl: './app.scss',
    templateUrl: './app.html',
})
export class App {
    protected readonly title = signal('weight-tracker');
    entries: WeightEntry[] = [];

    addEntry(entry: WeightEntry) {
        this.entries = [...this.entries, entry];
    }
}
