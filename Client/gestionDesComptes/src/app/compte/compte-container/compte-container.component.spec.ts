import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteContainerComponent } from './compte-container.component';

describe('CompteContainerComponent', () => {
  let component: CompteContainerComponent;
  let fixture: ComponentFixture<CompteContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompteContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompteContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
