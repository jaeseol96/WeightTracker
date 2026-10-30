import { Injectable } from '@angular/core';
import { WeightEntry } from '../models/weight-entry.model';

@Injectable({
    providedIn: 'root',
})
export class WeightEntryService {
    saveToStorage(entries: WeightEntry[]) {
        let toSave = JSON.stringify(entries);
        localStorage.setItem('entries', toSave);
    }
}
