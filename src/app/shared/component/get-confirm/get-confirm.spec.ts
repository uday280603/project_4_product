import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetConfirm } from './get-confirm';

describe('GetConfirm', () => {
  let component: GetConfirm;
  let fixture: ComponentFixture<GetConfirm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetConfirm],
    }).compileComponents();

    fixture = TestBed.createComponent(GetConfirm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
