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

        it('should add entry in the middle for a date in the middle', () => {
            const newEntry: WeightEntry = {
                date: '2026-02-09',
                weight: 155.6,
                unit: 'lb',
            };

            service.addEntry(newEntry);

            expect(service.entries()).toEqual([
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
                    date: '2026-02-09',
                    weight: 155.6,
                    unit: 'lb',
                },
                {
                    date: '2026-02-10',
                    weight: 156,
                    unit: 'lb',
                },
            ]);
        });

        it('should add entry to the beginning for date before first entry', () => {
            const newEntry: WeightEntry = {
                date: '2026-02-05',
                weight: 154.9,
                unit: 'lb',
            };

            service.addEntry(newEntry);

            expect(service.entries()).toEqual([newEntry, ...entries]);
        });

        it('should replace an entry if added to a date with existing entry', () => {
            const newEntry: WeightEntry = {
                date: '2026-02-07',
                weight: 155.5,
                unit: 'lb',
            };

            service.addEntry(newEntry);

            expect(service.entries()).toEqual([
                {
                    date: '2026-02-07',
                    weight: 155.5,
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
            ]);
        });
    });

    describe('removeEntry', () => {
        it('should remove the entry at the beginning', () => {
            const entryToRemove: WeightEntry = {
                date: '2026-02-07',
                weight: 155,
                unit: 'lb',
            };

            service.removeEntry(entryToRemove);

            expect(service.entries()).toEqual([
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
            ]);
        });

        it('should remove the entry in the middle', () => {
            const entryToRemove: WeightEntry = {
                date: '2026-02-08',
                weight: 155.2,
                unit: 'lb',
            };

            service.removeEntry(entryToRemove);

            expect(service.entries()).toEqual([
                {
                    date: '2026-02-07',
                    weight: 155,
                    unit: 'lb',
                },
                {
                    date: '2026-02-10',
                    weight: 156,
                    unit: 'lb',
                },
            ]);
        });

        it('should remove the entry at the end', () => {
            const entryToRemove: WeightEntry = {
                date: '2026-02-10',
                weight: 156,
                unit: 'lb',
            };

            service.removeEntry(entryToRemove);

            expect(service.entries()).toEqual([
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
            ]);
        });

        it('should leave entries unchanged for a date with no existing entry', () => {
            const entryToRemove: WeightEntry = {
                date: '2026-02-09',
                weight: 155.6,
                unit: 'lb',
            };

            service.removeEntry(entryToRemove);

            expect(service.entries()).toEqual(entries);
        });

        it('should leave an empty array after removing the only entry', () => {
            const entryToRemove: WeightEntry = {
                date: '2026-02-07',
                weight: 155,
                unit: 'lb',
            };

            localStorage.setItem('entries', JSON.stringify([entryToRemove]));
            service = new WeightEntryService();

            service.removeEntry(entryToRemove);

            expect(service.entries()).toEqual([]);
        });

        it('should leave an empty array unchanged when removing an entry', () => {
            const entryToRemove: WeightEntry = {
                date: '2026-02-07',
                weight: 155,
                unit: 'lb',
            };

            localStorage.setItem('entries', JSON.stringify([]));
            service = new WeightEntryService();

            service.removeEntry(entryToRemove);

            expect(service.entries()).toEqual([]);
        });
    });
});
