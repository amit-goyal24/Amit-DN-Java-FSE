import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CanComponentDeactivate } from '../../guards/unsaved-changes-guard';

@Component({
  selector: 'app-reactive-enrollment-form',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './reactive-enrollment-form.html',
  styleUrl: './reactive-enrollment-form.css',
})
export class ReactiveEnrollmentForm implements CanComponentDeactivate {
  enrollForm: FormGroup;
  submitted = false;

  constructor(fb: FormBuilder) {
    this.enrollForm = fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: ['', [Validators.required, Validators.email]],
      courseId: [null, [Validators.required, Validators.min(1)]],
      preferredSemester: ['', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
    });
  }

  get f() {
    return this.enrollForm.controls;
  }

  /**
   * CanComponentDeactivate implementation:
   * Returns true if form is pristine (no changes), allowing navigation.
   * Returns false if form is dirty (has changes), triggering confirmation dialog.
   */
  canDeactivate(): boolean {
    return !this.enrollForm.dirty;
  }

  submit(): void {
    if (this.enrollForm.valid) {
      console.log('Form submitted:', this.enrollForm.value);
      this.submitted = true;
      this.enrollForm.reset({ agreeToTerms: false });
    } else {
      this.enrollForm.markAllAsTouched();
    }
  }
}
