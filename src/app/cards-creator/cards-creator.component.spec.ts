import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsCreatorComponent } from './cards-creator.component';

describe('CardsCreatorComponent', () => {
  let component: CardsCreatorComponent;
  let fixture: ComponentFixture<CardsCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
