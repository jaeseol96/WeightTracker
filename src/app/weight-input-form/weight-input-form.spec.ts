import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeightInputForm } from './weight-input-form';

describe('WeightInputForm', () => {
  let component: WeightInputForm;
  let fixture: ComponentFixture<WeightInputForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeightInputForm],
    }).compileComponents();

    fixture = TestBed.createComponent(WeightInputForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
