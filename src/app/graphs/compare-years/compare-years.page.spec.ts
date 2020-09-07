import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompareYearsPage } from './compare-years.page';

describe('CompareYearsPage', () => {
  let component: CompareYearsPage;
  let fixture: ComponentFixture<CompareYearsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareYearsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompareYearsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
