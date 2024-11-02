import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarInsumoComponent } from './listar-insumo.component';

describe('ListarInsumoComponent', () => {
  let component: ListarInsumoComponent;
  let fixture: ComponentFixture<ListarInsumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarInsumoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarInsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
