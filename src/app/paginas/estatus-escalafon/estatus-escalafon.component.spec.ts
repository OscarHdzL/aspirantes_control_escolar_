import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatusEscalafonComponent } from './estatus-escalafon.component';

describe('EstatusEscalafonComponent', () => {
  let component: EstatusEscalafonComponent;
  let fixture: ComponentFixture<EstatusEscalafonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstatusEscalafonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstatusEscalafonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
