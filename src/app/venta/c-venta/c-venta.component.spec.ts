import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CVentaComponent } from './c-venta.component';

describe('CVentaComponent', () => {
  let component: CVentaComponent;
  let fixture: ComponentFixture<CVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CVentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
