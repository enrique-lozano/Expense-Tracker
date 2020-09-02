import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddAccountPage } from './add-account.page';

describe('AddAccountPage', () => {
  let component: AddAccountPage;
  let fixture: ComponentFixture<AddAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
