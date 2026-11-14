import { Component, inject } from '@angular/core';
import { WeightInputForm } from './weight-input-form/weight-input-form';
import { WeightChart } from './weight-chart/weight-chart';
import { WeightEntryService } from './services/weight-entry.service';
import { WeightEntry, WeightUnit } from './models/weight-entry.model';
import { Title } from './title/title';
import { WeightEntryDetail } from './weight-entry-detail/weight-entry-detail';
import { CurrentStatus } from './current-status/current-status';
import { SettingsService } from './services/settings.service';
import { SwUpdate } from '@angular/service-worker';

@Component({
    imports: [WeightInputForm, WeightChart, Title, WeightEntryDetail, CurrentStatus],
    selector: 'app-root',
    styleUrl: './app.scss',
    templateUrl: './app.html',
})
export class App {
    private readonly weightEntryService: WeightEntryService = inject(WeightEntryService);
    private readonly settingsService: SettingsService = inject(SettingsService);
    private readonly swUpdate: SwUpdate = inject(SwUpdate);

    protected readonly entries = this.weightEntryService.entries;
    selectedEntry: WeightEntry | null = null;
    currentUnit: WeightUnit = this.settingsService.default;

    constructor() {
        if (this.swUpdate.isEnabled) {
            this.swUpdate.versionUpdates.subscribe((event) => {
                if (event.type === 'VERSION_READY') {
                    window.location.reload();
                }
            });
        }
    }

    get mostRecentEntry(): WeightEntry | undefined {
        return this.entries().at(-1);
    }

    onDelete(entry: WeightEntry): void {
        this.weightEntryService.removeEntry(entry);
        this.selectedEntry = null;
    }
}
