import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditOneTransactionPage } from './edit-one-transaction.page';

describe('EditOneTransactionPage', () => {
  let component: EditOneTransactionPage;
  let fixture: ComponentFixture<EditOneTransactionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOneTransactionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditOneTransactionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
