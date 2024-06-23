import { TestBed } from '@angular/core/testing';

import { KomentarService } from './komentar.service';

describe('KomentarService', () => {
  let service: KomentarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KomentarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
