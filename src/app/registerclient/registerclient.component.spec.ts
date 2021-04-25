import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterclientComponent } from './registerclient.component';

describe('RegisterclientComponent', () => {
  let component: RegisterclientComponent;
  let fixture: ComponentFixture<RegisterclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterclientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
