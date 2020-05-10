import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFoungComponent } from './page-not-foung.component';

describe('PageNotFoungComponent', () => {
  let component: PageNotFoungComponent;
  let fixture: ComponentFixture<PageNotFoungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNotFoungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
