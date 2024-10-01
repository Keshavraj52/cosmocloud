import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BbListComponent } from './bb-list.component';

describe('BbListComponent', () => {
  let component: BbListComponent;
  let fixture: ComponentFixture<BbListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BbListComponent]
    });
    fixture = TestBed.createComponent(BbListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
