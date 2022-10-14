import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrensyDetailsComponent } from './currensy-details.component';

describe('CurrensyDetailsComponent', () => {
  let component: CurrensyDetailsComponent;
  let fixture: ComponentFixture<CurrensyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrensyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrensyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
