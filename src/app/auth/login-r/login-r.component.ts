import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';

// custom synchronus validator
function mustContainQuestionMark(control:AbstractControl){
  if (control.value.includes('?')) {
    return null;
  }

  return { doesNotContainQuestionMark:true };
}

// async validator
function emailIsUnique(control:AbstractControl) {
  if (control.value !== 'test@example.com') {
    return of(null)
  } 
  // of is a operator which emits observable
  return of({notUnique:true});
}
let emailInitialValue = '';
 const savedForm = window.localStorage.getItem('saved-login-form');
if (savedForm) {
  const loadedForm = JSON.parse(savedForm);
  emailInitialValue = loadedForm.email
}

@Component({
  selector: 'app-login-r',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-r.component.html',
  styleUrl: './login-r.component.css'
})
export class LoginRComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  loginForm = new FormGroup({
    email:new FormControl(emailInitialValue,{
      validators:[Validators.email, Validators.required],
      asyncValidators:[emailIsUnique]
    }),
    password: new FormControl('',{
      validators:[Validators.required,Validators.minLength(6),mustContainQuestionMark]
    })
  });
  
  // we can use ngoninit in case of reactive forms because it is initialized in the 
  // typescript code 
  ngOnInit(): void {
    // this below method also we can use to get data from localstorage and set to email formControl 
    // but there is good alternative to this method

    // const savedForm = window.localStorage.getItem('saved-login-form');
    // if (savedForm) {
    //   const loadedForm = JSON.parse(savedForm);
    //   this.loginForm.patchValue({
    //     email:loadedForm.email
    //   })
    // }

    const subscription = this.loginForm.valueChanges.pipe(debounceTime(500)).subscribe({
      next:value => window.localStorage.setItem(
        'saved-login-form',
        JSON.stringify({email:value.email})
      )
    });
    this.destroyRef.onDestroy(()=>subscription.unsubscribe());

  }

  get emailIsInvalid(){
    return (this.loginForm.controls.email.touched && this.loginForm.controls.email.dirty && 
      this.loginForm.controls.email.invalid);
  }
  
  get passwordIsInvalid(){
    return (this.loginForm.controls.password.touched && this.loginForm.controls.password.dirty && 
      this.loginForm.controls.password.invalid);
  }
  onSubmit(){
    console.log(this.loginForm);
    
  }
}
