import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalDiscountComponent } from './additional-discount.component';

describe('AdditionalDiscountComponent', () => {
  let component: AdditionalDiscountComponent;
  let fixture: ComponentFixture<AdditionalDiscountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdditionalDiscountComponent]
    });
    fixture = TestBed.createComponent(AdditionalDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
