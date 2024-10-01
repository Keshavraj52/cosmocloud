import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlaskApiComponent } from './flask-api.component';

describe('FlaskApiComponent', () => {
  let component: FlaskApiComponent;
  let fixture: ComponentFixture<FlaskApiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlaskApiComponent]
    });
    fixture = TestBed.createComponent(FlaskApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
