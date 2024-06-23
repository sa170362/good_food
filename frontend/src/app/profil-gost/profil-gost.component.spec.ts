import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilGostComponent } from './profil-gost.component';

describe('ProfilGostComponent', () => {
  let component: ProfilGostComponent;
  let fixture: ComponentFixture<ProfilGostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilGostComponent]
    });
    fixture = TestBed.createComponent(ProfilGostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
