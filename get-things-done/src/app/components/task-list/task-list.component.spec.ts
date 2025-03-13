import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakListComponent } from './task-list.component';

describe('TakListComponent', () => {
  let component: TakListComponent;
  let fixture: ComponentFixture<TakListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TakListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
