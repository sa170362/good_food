import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeniComponent } from './meni.component';

describe('MeniComponent', () => {
  let component: MeniComponent;
  let fixture: ComponentFixture<MeniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeniComponent]
    });
    fixture = TestBed.createComponent(MeniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
