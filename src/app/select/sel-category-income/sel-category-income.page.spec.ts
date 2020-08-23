import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelCategoryIncomePage } from './sel-category-income.page';

describe('SelCategoryIncomePage', () => {
  let component: SelCategoryIncomePage;
  let fixture: ComponentFixture<SelCategoryIncomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelCategoryIncomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelCategoryIncomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
