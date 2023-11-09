import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaNavigationComponent } from './tela-navigation.component';

describe('TelaNavigationComponent', () => {
  let component: TelaNavigationComponent;
  let fixture: ComponentFixture<TelaNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelaNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
