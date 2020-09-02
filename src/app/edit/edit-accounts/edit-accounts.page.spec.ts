import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditAccountsPage } from './edit-accounts.page';

describe('EditAccountsPage', () => {
  let component: EditAccountsPage;
  let fixture: ComponentFixture<EditAccountsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAccountsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditAccountsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
