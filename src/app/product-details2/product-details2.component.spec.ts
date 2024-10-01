import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetails2Component } from './product-details2.component';

describe('ProductDetails2Component', () => {
  let component: ProductDetails2Component;
  let fixture: ComponentFixture<ProductDetails2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetails2Component]
    });
    fixture = TestBed.createComponent(ProductDetails2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
