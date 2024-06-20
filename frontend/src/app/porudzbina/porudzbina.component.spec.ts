import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorudzbinaComponent } from './porudzbina.component';

describe('PorudzbinaComponent', () => {
  let component: PorudzbinaComponent;
  let fixture: ComponentFixture<PorudzbinaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PorudzbinaComponent]
    });
    fixture = TestBed.createComponent(PorudzbinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
