import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoraniGostComponent } from './restorani-gost.component';

describe('RestoraniGostComponent', () => {
  let component: RestoraniGostComponent;
  let fixture: ComponentFixture<RestoraniGostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestoraniGostComponent]
    });
    fixture = TestBed.createComponent(RestoraniGostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
