import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocAppointmentComponent } from './doc-appointment.component';

describe('DocAppointmentComponent', () => {
  let component: DocAppointmentComponent;
  let fixture: ComponentFixture<DocAppointmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocAppointmentComponent]
    });
    fixture = TestBed.createComponent(DocAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
