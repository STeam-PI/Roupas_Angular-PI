import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdCadastroComponent } from './prod-cadastro.component';

describe('ProdCadastroComponent', () => {
  let component: ProdCadastroComponent;
  let fixture: ComponentFixture<ProdCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdCadastroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
