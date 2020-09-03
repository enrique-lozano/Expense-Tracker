import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelAccountTransfersPage } from './sel-account-transfers.page';

describe('SelAccountTransfersPage', () => {
  let component: SelAccountTransfersPage;
  let fixture: ComponentFixture<SelAccountTransfersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelAccountTransfersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelAccountTransfersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
