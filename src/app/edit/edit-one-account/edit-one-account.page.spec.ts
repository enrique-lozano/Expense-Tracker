import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditOneAccountPage } from './edit-one-account.page';

describe('EditOneAccountPage', () => {
  let component: EditOneAccountPage;
  let fixture: ComponentFixture<EditOneAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOneAccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditOneAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
