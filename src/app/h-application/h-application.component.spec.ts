import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HApplicationComponent } from './h-application.component';

describe('HApplicationComponent', () => {
  let component: HApplicationComponent;
  let fixture: ComponentFixture<HApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HApplicationComponent]
    });
    fixture = TestBed.createComponent(HApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
