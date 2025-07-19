import { Component, inject, OnInit, output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, JsonPipe } from '@angular/common';
import { TextInputComponent } from "../../_forms/text-input.component/text-input.component";
import { DatePickerComponent } from "../../_forms/date-picker.component/date-picker.component";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, JsonPipe, CommonModule, TextInputComponent, DatePickerComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  private accountService = inject(AccountService)
  private toastr = inject(ToastrService);
  private fb = inject(FormBuilder);
  cancelRegister = output<boolean>();
  model: any = {}
  registerForm: FormGroup = new FormGroup({});
  maxDate = new Date();

  ngOnInit(): void {
      this.initializeForm();
      this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', [Validators.required]],
      knownAs: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      password: ['', [Validators.minLength(4), 
          Validators.maxLength(8), Validators.required]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    });
    // Re-validate confirmPassword whenever password changes
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {isMatching: true}
    }
  }

  register() {
    console.log(this.registerForm.value);
    // this.accountService.register(this.model).subscribe({
    //   next: response => {
    //     console.log(response);
    //     this.cancel();
    //   },
    //   error: error => this.toastr.error(error.error)
    // })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
