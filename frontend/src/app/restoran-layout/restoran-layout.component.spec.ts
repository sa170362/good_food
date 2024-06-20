import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoranLayoutComponent } from './restoran-layout.component';

describe('RestoranLayoutComponent', () => {
  let component: RestoranLayoutComponent;
  let fixture: ComponentFixture<RestoranLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestoranLayoutComponent]
    });
    fixture = TestBed.createComponent(RestoranLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
