import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstructuraPeggy } from './estructura-peggy';

describe('EstructuraPeggy', () => {
  let component: EstructuraPeggy;
  let fixture: ComponentFixture<EstructuraPeggy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstructuraPeggy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstructuraPeggy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
