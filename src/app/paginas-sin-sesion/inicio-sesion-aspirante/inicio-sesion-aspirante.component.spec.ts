import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioSesionAspiranteComponent } from './inicio-sesion-aspirante.component';

describe('InicioSesionAspiranteComponent', () => {
  let component: InicioSesionAspiranteComponent;
  let fixture: ComponentFixture<InicioSesionAspiranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioSesionAspiranteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioSesionAspiranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
