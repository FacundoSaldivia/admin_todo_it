import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaViajes2Component } from './tabla-viajes2.component';

describe('TablaViajes2Component', () => {
  let component: TablaViajes2Component;
  let fixture: ComponentFixture<TablaViajes2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaViajes2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaViajes2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
