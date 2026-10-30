import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnitConverterService } from './unit-converter-service';

describe('UnitConverterService', () => {
  let component: UnitConverterService;
  let fixture: ComponentFixture<UnitConverterService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitConverterService],
    }).compileComponents();

    fixture = TestBed.createComponent(UnitConverterService);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
