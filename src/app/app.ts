import { Component, inject } from '@angular/core';
import { WeightInputForm } from './weight-input-form/weight-input-form';
import { WeightChart } from './weight-chart/weight-chart';
import { WeightEntryService } from './services/weight-entry.service';
import { WeightEntry } from './models/weight-entry.model';
import { Title } from './title/title';

@Component({
    imports: [WeightInputForm, WeightChart, Title],
    selector: 'app-root',
    styleUrl: './app.scss',
    templateUrl: './app.html',
})
export class App {
    private readonly weightEntryService: WeightEntryService = inject(WeightEntryService);
    protected readonly entries = this.weightEntryService.entries;
}
