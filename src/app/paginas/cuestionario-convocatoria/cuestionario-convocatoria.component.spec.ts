import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuestionarioConvocatoriaComponent } from './cuestionario-convocatoria.component';

describe('CuestionarioConvocatoriaComponent', () => {
  let component: CuestionarioConvocatoriaComponent;
  let fixture: ComponentFixture<CuestionarioConvocatoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuestionarioConvocatoriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuestionarioConvocatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
