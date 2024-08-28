import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRComponent } from './login-r.component';

describe('LoginRComponent', () => {
  let component: LoginRComponent;
  let fixture: ComponentFixture<LoginRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginRComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
