import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddTransactionPage } from './add-transaction.page';

describe('AddTransactionPage', () => {
  let component: AddTransactionPage;
  let fixture: ComponentFixture<AddTransactionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTransactionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddTransactionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
