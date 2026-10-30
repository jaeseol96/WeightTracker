import {Injectable, signal} from '@angular/core';
import { WeightEntry } from '../models/weight-entry.model';

@Injectable({
    providedIn: 'root',
})
export class WeightEntryService {
    private readonly _entries = signal<WeightEntry[]>([]);
    readonly entries = this._entries.asReadonly();

    addEntry(weightEntry: WeightEntry) {
        const date = weightEntry.date;
        this._entries.update((current) => [...current.filter(entry => entry.date !== date), weightEntry]);
        this.saveToStorage(this._entries());
    }

    private saveToStorage(entries: WeightEntry[]) {
        let toSave = JSON.stringify(entries);
        localStorage.setItem('entries', toSave);
    }
}
