import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCoursesComponent } from './table-courses.component';

describe('TableCoursesComponent', () => {
  let component: TableCoursesComponent;
  let fixture: ComponentFixture<TableCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
