import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DostavaGostComponent } from './dostava-gost.component';

describe('DostavaGostComponent', () => {
  let component: DostavaGostComponent;
  let fixture: ComponentFixture<DostavaGostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DostavaGostComponent]
    });
    fixture = TestBed.createComponent(DostavaGostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
