import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaMetasComponent } from './tela-metas.component';

describe('TelaMetasComponent', () => {
  let component: TelaMetasComponent;
  let fixture: ComponentFixture<TelaMetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaMetasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaMetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
