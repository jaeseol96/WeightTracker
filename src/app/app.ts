import { Component, inject, signal } from '@angular/core';
import { WeightInputForm } from './weight-input-form/weight-input-form';
import { WeightChart } from './weight-chart/weight-chart';
import { WeightEntryService } from './services/weight-entry.service';
import { WeightEntry } from './models/weight-entry.model';
import { Title } from './title/title';
import { CurrentStatus } from './current-status/current-status';
import { WeightEntryDetail } from './weight-entry-detail/weight-entry-detail';

@Component({
    imports: [WeightInputForm, WeightChart, Title, CurrentStatus, WeightEntryDetail],
    selector: 'app-root',
    styleUrl: './app.scss',
    templateUrl: './app.html',
})
export class App {
    private readonly weightEntryService: WeightEntryService = inject(WeightEntryService);
    protected readonly entries = this.weightEntryService.entries;
    selectedEntry: WeightEntry | null = null;

    get mostRecentEntry(): WeightEntry | undefined {
        return this.entries().at(-1);
    }
}
