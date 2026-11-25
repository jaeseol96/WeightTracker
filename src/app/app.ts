import { Component, computed, inject, signal } from '@angular/core';
import { WeightInputForm } from './weight-input-form/weight-input-form';
import { WeightChart } from './weight-chart/weight-chart';
import { WeightEntryService } from './services/weight-entry.service';
import { WeightEntry } from './models/weight-entry.model';
import { WeightUnit } from './models/weight-value.model';
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
    protected readonly currentUnit = this.settingsService.currentUnit;
    protected readonly selectedDate = signal<string | null>(null);
    protected readonly selectedEntry = computed(() => {
        const date = this.selectedDate();

        if (date === null) {
            return null;
        }

        return this.entries().find((entry) => entry.date === date) ?? null;
    });

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
        this.selectedDate.set(null);
    }
}
