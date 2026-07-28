import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-enrollment-form',
  imports: [FormsModule, NgIf],
  templateUrl: './enrollment-form.html',
  styleUrl: './enrollment-form.css',
})
export class EnrollmentForm {
  studentName = ''; studentEmail = ''; courseId: number | null = null; preferredSemester = ''; agreeToTerms = false;
  submitted = false;
  successMessage = '';
  onSubmit(form: NgForm): void {
    console.log('Enrollment submitted:', form.value, form.valid);
    if (!form.valid) return;
    this.submitted = true;
    this.successMessage = `Enrollment request for ${form.value.studentName} was submitted.`;
    form.resetForm();
  }
}
