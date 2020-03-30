/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LocalCasesComponent } from './local.component';

describe('LocalCasesComponent', () => {
  let component: LocalCasesComponent;
  let fixture: ComponentFixture<LocalCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LocalCasesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
