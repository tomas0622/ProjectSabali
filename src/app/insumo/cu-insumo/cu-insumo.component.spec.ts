import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuInsumoComponent } from './cu-insumo.component';

describe('CuInsumoComponent', () => {
  let component: CuInsumoComponent;
  let fixture: ComponentFixture<CuInsumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CuInsumoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuInsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
