import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrensyConverterComponent } from './currensy-converter.component';

describe('CurrensyConverterComponent', () => {
  let component: CurrensyConverterComponent;
  let fixture: ComponentFixture<CurrensyConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrensyConverterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrensyConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
