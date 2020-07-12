import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchFileReaderComponent } from './match-file-reader.component';

describe('MatchFileReaderComponent', () => {
  let component: MatchFileReaderComponent;
  let fixture: ComponentFixture<MatchFileReaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchFileReaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchFileReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
