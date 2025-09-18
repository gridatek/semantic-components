import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Layouts } from './layouts';

describe('Layouts', () => {
  let component: Layouts;
  let fixture: ComponentFixture<Layouts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Layouts],
    }).compileComponents();

    fixture = TestBed.createComponent(Layouts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
