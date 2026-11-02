export type WeightUnit = 'kg' | 'lb';

export interface WeightEntry {
    date: string;
    weight: number;
    unit: WeightUnit;
}
