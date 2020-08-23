import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelCategoryExpensesPage } from './sel-category-expenses.page';

describe('SelCategoryExpensesPage', () => {
  let component: SelCategoryExpensesPage;
  let fixture: ComponentFixture<SelCategoryExpensesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelCategoryExpensesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelCategoryExpensesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
