export type WeightUnit = 'kg' | 'lb';

export interface WeightEntry {
    date: Date;
    weight: number;
    unit: WeightUnit;
}
