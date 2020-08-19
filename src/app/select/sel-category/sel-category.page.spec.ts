import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelCategoryPage } from './sel-category.page';

describe('SelCategoryPage', () => {
  let component: SelCategoryPage;
  let fixture: ComponentFixture<SelCategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelCategoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
