import { Injectable, signal } from '@angular/core';
import { WeightEntry } from '../models/weight-entry.model';

@Injectable({
    providedIn: 'root',
})
export class WeightEntryService {
    private readonly _entries = signal<WeightEntry[]>([]);
    private loadFailed: boolean = false;

    readonly entries = this._entries.asReadonly();
    loadedEntries: WeightEntry[];

    constructor() {
        this.loadedEntries = this.loadFromStorage();
        this._entries.set(this.loadedEntries);
    }

    addEntry(weightEntry: WeightEntry) {
        if (this.loadFailed) {
            console.error('Saving is blocked because loading has failed.');
            return;
        }

        const date = weightEntry.date;
        this._entries.update((current) =>
            [...current.filter((entry) => entry.date !== date), weightEntry].sort((a, b) =>
                a.date.localeCompare(b.date),
            ),
        );
        this.saveToStorage(this._entries());
    }

    removeEntry(weightEntry: WeightEntry) {
        if (this.loadFailed) {
            console.error('Could not delete the entry because loading has failed.');
            return;
        }

        this._entries.update((current) =>
            current.filter((entry) => entry.date != weightEntry.date),
        );
        this.saveToStorage(this._entries());
    }

    private saveToStorage(entries: WeightEntry[]) {
        let toSave = JSON.stringify(entries);
        localStorage.setItem('entries', toSave);
    }

    private loadFromStorage(): WeightEntry[] {
        try {
            let toLoad = localStorage.getItem('entries');
            if (!toLoad) {
                return [];
            }

            return JSON.parse(toLoad);
        } catch {
            this.loadFailed = true;
            console.error('Loading failed');
            return [];
        }
    }
}
