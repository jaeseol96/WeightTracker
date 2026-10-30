import { Injectable } from '@angular/core';
import {WeightUnit} from '../models/weight-entry.model';

@Injectable({
    providedIn: 'root',
})
export class SettingsService {
    default:WeightUnit = 'lb';
}
