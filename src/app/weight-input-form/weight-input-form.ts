import { Component, ElementRef, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';
import { WeightEntryService } from '../services/weight-entry.service';
import { WeightEntry } from '../models/weight-entry.model';
import { WeightUnit } from '../models/weight-value.model';
import { LucideCalendarDays } from '@lucide/angular';
import { SettingsService } from '../services/settings.service';

@Component({
    imports: [DatePipe, FormsModule, LucideCalendarDays],
    selector: 'app-weight-input-form',
    styleUrl: './weight-input-form.scss',
    templateUrl: './weight-input-form.html',
})
export class WeightInputForm {
    weight: number | null = null;
    selectedUnit: WeightUnit = 'lb';
    selectedDate: string = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    dateInput = viewChild<ElementRef<HTMLInputElement>>('dateInput');

    constructor(
        private weightEntryService: WeightEntryService,
        private settingsService: SettingsService,
    ) {
        this.selectedUnit = this.settingsService.currentUnit();
    }

    get isToday() {
        if (this.selectedDate === formatDate(new Date(), 'yyyy-MM-dd', 'en-US')) {
            return true;
        } else {
            return false;
        }
    }

    onSubmit() {
        const weight = this.weight;

        if (weight === null || !Number.isFinite(weight) || weight <= 0) {
            return;
        }

        const entry = this.buildEntry(weight);
        this.weightEntryService.addEntry(entry);
        this.weight = null;
    }

    openDatePicker() {
        this.dateInput()?.nativeElement.showPicker();
    }

    onDateChange(newDate: string) {
        this.selectedDate = newDate;
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
