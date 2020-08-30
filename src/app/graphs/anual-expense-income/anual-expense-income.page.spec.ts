import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AnualExpenseIncomePage } from './anual-expense-income.page';

describe('AnualExpenseIncomePage', () => {
  let component: AnualExpenseIncomePage;
  let fixture: ComponentFixture<AnualExpenseIncomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnualExpenseIncomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AnualExpenseIncomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
