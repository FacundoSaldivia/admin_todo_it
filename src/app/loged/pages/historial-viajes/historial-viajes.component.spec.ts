import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialViajesComponent } from './historial-viajes.component';

describe('HistorialViajesComponent', () => {
  let component: HistorialViajesComponent;
  let fixture: ComponentFixture<HistorialViajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialViajesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialViajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
