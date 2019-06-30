import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitsComponent } from './chits.component';

describe('ChitsComponent', () => {
  let component: ChitsComponent;
  let fixture: ComponentFixture<ChitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
