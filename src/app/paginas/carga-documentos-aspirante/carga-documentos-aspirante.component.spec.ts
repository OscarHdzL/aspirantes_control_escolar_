import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaDocumentosAspiranteComponent } from './carga-documentos-aspirante.component';

describe('CargaDocumentosAspiranteComponent', () => {
  let component: CargaDocumentosAspiranteComponent;
  let fixture: ComponentFixture<CargaDocumentosAspiranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargaDocumentosAspiranteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargaDocumentosAspiranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
