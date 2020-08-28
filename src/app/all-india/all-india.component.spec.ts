import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllIndiaComponent } from './all-india.component';

describe('AllIndiaComponent', () => {
  let component: AllIndiaComponent;
  let fixture: ComponentFixture<AllIndiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllIndiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllIndiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
