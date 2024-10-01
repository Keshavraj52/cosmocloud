import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XRayComponent } from './x-ray.component';

describe('XRayComponent', () => {
  let component: XRayComponent;
  let fixture: ComponentFixture<XRayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [XRayComponent]
    });
    fixture = TestBed.createComponent(XRayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
