import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreregistroAspiranteComponent } from './preregistro-aspirante.component';

describe('PreregistroAspiranteComponent', () => {
  let component: PreregistroAspiranteComponent;
  let fixture: ComponentFixture<PreregistroAspiranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreregistroAspiranteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreregistroAspiranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
