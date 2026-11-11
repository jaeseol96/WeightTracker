import { WeightEntry } from '../models/weight-entry.model';
import { WeightEntryService } from './weight-entry.service';

describe('WeightEntryService', () => {
    let service: WeightEntryService;
    let entries: WeightEntry[];

    beforeEach(() => {
        entries = [
            {
                date: '2026-02-07',
                weight: 155,
                unit: 'lb',
            },
            {
                date: '2026-02-08',
                weight: 155.2,
                unit: 'lb',
            },
            {
                date: '2026-02-10',
                weight: 156,
                unit: 'lb',
            },
        ];

        localStorage.setItem('entries', JSON.stringify(entries));
        service = new WeightEntryService();
    });

    describe('addEntry', () => {
        it('should add entry to the end for date after last entry', () => {
            const newEntry: WeightEntry = {
                date: '2026-02-11',
                weight: 156.2,
                unit: 'lb',
            };

            service.addEntry(newEntry);

            expect(service.entries()).toEqual([...entries, newEntry]);
        });
    });
});
