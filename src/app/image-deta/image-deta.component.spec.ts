import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDetaComponent } from './image-deta.component';

describe('ImageDetaComponent', () => {
  let component: ImageDetaComponent;
  let fixture: ComponentFixture<ImageDetaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageDetaComponent]
    });
    fixture = TestBed.createComponent(ImageDetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
