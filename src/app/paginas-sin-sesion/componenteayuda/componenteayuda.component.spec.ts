import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteayudaComponent } from './componenteayuda.component';

describe('ComponenteayudaComponent', () => {
  let component: ComponenteayudaComponent;
  let fixture: ComponentFixture<ComponenteayudaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponenteayudaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteayudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
