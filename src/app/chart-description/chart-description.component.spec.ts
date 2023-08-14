import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDescriptionComponent } from './chart-description.component';

describe('ChartDescriptionComponent', () => {
  let component: ChartDescriptionComponent;
  let fixture: ComponentFixture<ChartDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
