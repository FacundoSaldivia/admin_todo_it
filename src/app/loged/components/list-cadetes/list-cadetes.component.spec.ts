import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCadetesComponent } from './list-cadetes.component';

describe('ListCadetesComponent', () => {
  let component: ListCadetesComponent;
  let fixture: ComponentFixture<ListCadetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCadetesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCadetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
