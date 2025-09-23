import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdAddComponent } from './prod-add.component';

describe('ProdAddComponent', () => {
  let component: ProdAddComponent;
  let fixture: ComponentFixture<ProdAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
