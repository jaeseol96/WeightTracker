import { WeightValue } from '../models/weight-value.model';
import { UnitConverterService } from './unit-converter-service';

describe('UnitConverterService', () => {
    let service: UnitConverterService;

    beforeEach(() => {
        service = new UnitConverterService();
    });

    describe('convertWeight', () => {
        it('should convert lb to kg', () => {
            const source: WeightValue = { weight: 155, unit: 'lb' };

            const result = service.convertWeight(source, 'kg');

            expect(result.unit).toBe('kg');
            expect(result.weight).toBeCloseTo(70.307, 3);
        });

        it('should convert kg to lb', () => {
            const source: WeightValue = { weight: 70, unit: 'kg' };

            const result = service.convertWeight(source, 'lb');

            expect(result.unit).toBe('lb');
            expect(result.weight).toBeCloseTo(154.324, 3);
        });

        it('should return the same value when the target unit matches the source unit', () => {
            const source: WeightValue = { weight: 155.2, unit: 'lb' };

            const result = service.convertWeight(source, 'lb');

            expect(result).toEqual({ weight: 155.2, unit: 'lb' });
        });

        it('should return the original weight after converting to another unit and back', () => {
            const source: WeightValue = { weight: 155.2, unit: 'lb' };

            const inKg = service.convertWeight(source, 'kg');
            const backInLb = service.convertWeight(inKg, 'lb');

            expect(backInLb.unit).toBe('lb');
            expect(backInLb.weight).toBeCloseTo(155.2, 10);
        });

        it('should convert zero to zero', () => {
            const source: WeightValue = { weight: 0, unit: 'lb' };

            const result = service.convertWeight(source, 'kg');

            expect(result).toEqual({ weight: 0, unit: 'kg' });
        });

        it('should return a new object rather than the source when units match', () => {
            const source: WeightValue = { weight: 155, unit: 'lb' };

            const result = service.convertWeight(source, 'lb');

            expect(result).not.toBe(source);
        });

        it('should not modify the source value', () => {
            const source: WeightValue = { weight: 155, unit: 'lb' };

            service.convertWeight(source, 'kg');

            expect(source).toEqual({ weight: 155, unit: 'lb' });
        });
    });
});
