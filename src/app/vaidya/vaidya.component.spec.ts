import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaidyaComponent } from './vaidya.component';

describe('VaidyaComponent', () => {
  let component: VaidyaComponent;
  let fixture: ComponentFixture<VaidyaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VaidyaComponent]
    });
    fixture = TestBed.createComponent(VaidyaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
