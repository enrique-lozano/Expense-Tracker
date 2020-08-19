import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelAccountPage } from './sel-account.page';

describe('SelAccountPage', () => {
  let component: SelAccountPage;
  let fixture: ComponentFixture<SelAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelAccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
