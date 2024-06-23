import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { rangeValidator } from '../utilities/custom-form-validators/range.validators';
import { atLeastOneControlValid } from '../utilities/custom-form-validators/atlestOneValid-in-formGroup.validator';
import { AadharCustonControlValueAccessorDirective } from '../utilities/custom-control-value-accessor/aadhar.custon-control-value-accessor.directive';
import { BarsComponent } from './bars.component';
import { TextInputComponent } from './text-input.component';
@Component({
  selector: 'app-student-forms',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DatePipe,
    NgTemplateOutlet,
    AadharCustonControlValueAccessorDirective,
    BarsComponent,
    TextInputComponent,
  ],
  template: `
    <form [formGroup]="studentForm" (ngSubmit)="onSubmit()">
      <app-text-input
        formControlName="firstName"
        [perentForm]="studentForm"
        [fieldName]="'firstName'"
        [label]="'First Name'"
      ></app-text-input>
      <ng-container
        [ngTemplateOutlet]="inputTextErrorTemplate"
        [ngTemplateOutletContext]="{ control: firstName }"
      >
      </ng-container>
      <div>
        <label for="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          formControlName="lastName"
          [class.error-field]="lastName.errors && lastName.touched"
        />
      </div>
      <ng-container
        [ngTemplateOutlet]="inputTextErrorTemplate"
        [ngTemplateOutletContext]="{ control: lastName }"
      >
      </ng-container>
      <div>
        <label for="age">Age:</label>
        <input
          type="number"
          id="age"
          formControlName="age"
          [class.error-field]="(age.errors?.['required'] || age.errors?.['min'] || age.errors?.['max']) && age.touched"
        />
      </div>
      @if (age.errors?.['required'] && age.touched) {
      <span class="error-text">This field is required</span>
      }@else if(age.errors?.['ageRange']){
      <span class="error-text">
        Age should be between {{ age.errors?.['ageRange'].min }} and
        {{ age.errors?.['ageRange'].max }}</span
      >
      }
      <div>
        <label for="gender">Gender:</label>
        @for (gender of genders; track $index) {
        <input
          type="radio"
          id="gender"
          formControlName="gender"
          [value]="gender.value"
        />{{ gender.name }}
        }
      </div>
      <div>
        <label for="semester">Semester:</label>
        <select id="semester" formControlName="semester">
          @for (semester of semesters; track $index) {
          <option [value]="semester.value">{{ semester.name }}</option>
          }
        </select>
      </div>
      <label for="interests">Semester:</label>
      <div formGroupName="interests" id="interests">
        <div>
          <label for="Programming">Programming:</label>
          <input
            type="checkbox"
            id="Programming"
            formControlName="Programming"
          />
        </div>
        <div>
          <label for="research">Research:</label>
          <input type="checkbox" id="research" formControlName="research" />
        </div>
        <div>
          <label for="sports">Sports:</label>
          <input type="checkbox" id="sports" formControlName="sports" />
        </div>
      </div>
      @if (interests.errors?.['atLeastOneControlValid'] && interests.dirty) {
      <span class="error-text">select atlest one interest</span>
      }
      <div>
        <div>
          <label for="dob">DOB:</label>
          <input
            type="date"
            id="dob"
            formControlName="dateOfBirth"
            [value]="dateOfBirth.value | date : 'yyyy-MM-dd'"
          />
        </div>
      </div>
      <div>
        <div>
          <label for="aadharNo">aadharNo:</label>
          <input
            type="text"
            id="aadharNo"
            data-input-type="aadharNo"
            formControlName="aadharNo"
          />
        </div>
      </div>
      <div formGroupName="address">
        <div>
          <label for="city">City:</label>
          <input type="text" id="city" formControlName="city" />
        </div>
        <div>
          <label for="state">State:</label>
          <input type="text" id="state" formControlName="state" />
        </div>
        <div>
          <label for="pinCode">Pin Code:</label>
          <input type="text" id="pinCode" formControlName="pinCode" />
        </div>
      </div>
      <div formArrayName="phones">
        <label for="phone">Phone</label>
        <button (click)="addNewPhoneControl()">+</button><br />
        @for(phone of phones ; track $index){
        <input type="tel" id="phone" [formControlName]="$index" /><br />
        }
      </div>
      <div>
        <div>
          <label for="bars">Bars:</label>
          <app-bars id="bars" formControlName="bars"></app-bars>
        </div>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>

    <ng-template #inputTextErrorTemplate let-control="control">
      @if (control.errors?.['required'] && control.touched) {
      <span class="error-text">This field is required</span>
      }@else if (control.errors?.['pattern'] && control.touched) {
      <span class="error-text">Invalid value provided</span>
      }
    </ng-template>
  `,
  styles: `
    .error-text {
      color: red;
    }
    .error-field{
       border: 1px solid red;
       outline: none;
       box-shadow: 0 0 5px rgba(255, 0, 0, 0.7);
    }
  `,
})
export class StudentFormsComponent {
  semesters = [
    { name: 1, value: 'first' },
    { name: 2, value: 'second' },
    { name: 3, value: 'third' },
    { name: 4, value: 'forth' },
  ];

  genders = [
    { name: 'Male', value: 'male' },
    { name: 'Female', value: 'female' },
    { name: 'Other', value: 'other' },
  ];

  studentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      lastName: ['', [Validators.required]],
      age: [null, [Validators.required, rangeValidator(18, 60)]],
      gender: ['', [Validators.required]],
      semester: ['', [Validators.required]],
      dateOfBirth: [
        new Date().toISOString().split('T')[0],
        [Validators.required],
      ],
      aadharNo: ['1234567890', [Validators.required]],
      interests: this.fb.group(
        {
          Programming: [false, [Validators.required]],
          research: [false, [Validators.required]],
          sports: [false, [Validators.required]],
        },
        { validators: atLeastOneControlValid() }
      ),
      address: this.fb.group({
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        pinCode: ['', [Validators.required]],
      }),
      phones: this.fb.array([this.getNewPhoneControl()]),
      bars: [' | | ', Validators.required],
    });
  }

  onSubmit() {
    console.log(this.studentForm.value);
    console.log(this.studentForm.controls['bars'].valid);
  }

  addNewPhoneControl() {
    (this.studentForm.controls?.['phones'] as FormArray).push(
      this.getNewPhoneControl()
    );
  }
  getNewPhoneControl() {
    return this.fb.control('');
  }

  get firstName() {
    return this.studentForm.controls['firstName'];
  }
  get lastName() {
    return this.studentForm.controls['lastName'];
  }

  get age() {
    return this.studentForm.controls['age'];
  }

  get phones() {
    return (this.studentForm.controls?.['phones'] as FormArray).controls;
  }

  get dateOfBirth() {
    return this.studentForm.controls['dateOfBirth'];
  }

  get interests() {
    return this.studentForm.controls['interests'];
  }
}
