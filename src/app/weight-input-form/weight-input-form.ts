import { Component, ElementRef, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { WeightEntryService } from '../services/weight-entry.service';
import { WeightEntry, WeightUnit } from '../models/weight-entry.model';

@Component({
    imports: [DatePipe, FormsModule],
    selector: 'app-weight-input-form',
    styleUrl: './weight-input-form.scss',
    templateUrl: './weight-input-form.html',
})
export class WeightInputForm {
    weight: number | null = null;
    selectedUnit: WeightUnit = 'lb';

    constructor(private weightEntryService: WeightEntryService) {
        this.weightEntryService = weightEntryService;
    }

    selectedDate = new Date();
    dateInput = viewChild<ElementRef<HTMLInputElement>>('dateInput');

    onSubmit() {
        const weight = this.weight;

        if (weight === null || !Number.isFinite(weight) || weight <= 0) {
            return;
        }

        const entry = this.buildEntry(weight);
        this.weightEntryService.addEntry(entry);
    }

    openDatePicker() {
        this.dateInput()?.nativeElement.showPicker();
    }

    onDateChange(newDate: string) {
        this.selectedDate = new Date(`${newDate}T00:00:00`);
    }

    private buildEntry(weight: number): WeightEntry {
        const newEntry: WeightEntry = {
            date: this.selectedDate,
            weight: weight,
            unit: this.selectedUnit,
        };
        return newEntry;
    }
}
