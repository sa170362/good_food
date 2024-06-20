import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorPocetnaComponent } from './administrator-pocetna.component';

describe('AdministratorPocetnaComponent', () => {
  let component: AdministratorPocetnaComponent;
  let fixture: ComponentFixture<AdministratorPocetnaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministratorPocetnaComponent]
    });
    fixture = TestBed.createComponent(AdministratorPocetnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
