import { TestBed } from '@angular/core/testing';

import { GnomesService } from './gnomes.service';

describe('GnomesService', () => {
  let service: GnomesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GnomesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
