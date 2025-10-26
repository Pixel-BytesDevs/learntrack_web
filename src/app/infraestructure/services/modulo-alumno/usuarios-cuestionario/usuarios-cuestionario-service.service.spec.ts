import { TestBed } from '@angular/core/testing';

import { UsuariosCuestionarioService } from './usuarios-cuestionario-service.service';

describe('UsuariosCuestionarioService', () => {
  let service: UsuariosCuestionarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosCuestionarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
