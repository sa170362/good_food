import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RezervacijeGostComponent } from './rezervacije-gost.component';

describe('RezervacijeGostComponent', () => {
  let component: RezervacijeGostComponent;
  let fixture: ComponentFixture<RezervacijeGostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RezervacijeGostComponent]
    });
    fixture = TestBed.createComponent(RezervacijeGostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
