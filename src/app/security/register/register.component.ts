import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private _auth: AuthService,
    private router: Router,

  ) { }

  registerGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    repeatPassword: new FormControl('', Validators.required)
  });

  test(){
    const email = this.registerGroup.value.email;
    const password = this.registerGroup.value.password;
    const repeatPassword = this.registerGroup.value.repeatPassword;
    console.log(email, password, repeatPassword);
  }

  registerUser() {
    const email = this.registerGroup.value.email;
    const password = this.registerGroup.value.password;

    console.log(email, password);
    this._auth.registerUser(email, password)
      .subscribe(() => this.router.navigateByUrl('/login'));
  }

  ngOnInit(): void {
  }
}
//   profileForm = new FormGroup(
//     {
//       password: new FormControl('', [Validators.required]),
//       confirmPassword: new FormControl('', [Validators.required]),
//     },
//     [CustomValidators.MatchValidator('password', 'confirmPassword')]
//   );

//   get passwordMatchError() {
//     return (
//       console.log("passwordMatchError"),
//       this.profileForm.getError('mismatch') &&
//       this.profileForm.get('confirmPassword')?.touched
//     );
//   }

// }

// export class CustomValidators {
//   static MatchValidator(source: string, target: string): ValidatorFn {
//     return (control: AbstractControl): ValidationErrors | null => {
//       const sourceCtrl = control.get(source);
//       const targetCtrl = control.get(target);

//       return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
//         ? { mismatch: true }
//         : null;
//     };
//   }

