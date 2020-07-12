import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XlsReaderComponent } from './xls-reader.component';

describe('XlsReaderComponent', () => {
  let component: XlsReaderComponent;
  let fixture: ComponentFixture<XlsReaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XlsReaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XlsReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
