export type WeightUnit = 'kg' | 'lb';

export interface WeightValue {
    weight: number;
    unit: WeightUnit;
}
