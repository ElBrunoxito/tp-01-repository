import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-info-user',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './info-user.html',
  styleUrl: './info-user.css',
})
export class InfoUser {
profileForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.profileForm = this.fb.group({
      fullName: ['Alejandro Martínez', [Validators.required]],
      email: ['alejandro.martinez@teacch.help', [Validators.required, Validators.email]],
      occupation: [''],

      childName: [''],
      childAge: [null, [Validators.min(0)]],
      childGender: [''],
      asdLevel: [''],

      currentPassword: [''],
      newPassword: ['', [Validators.minLength(8)]]
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      console.log('Datos actualizados con éxito:', this.profileForm.value);
    }
  }

  onCancel(): void {
    this.profileForm.reset({
      fullName: 'Alejandro Martínez',
      email: 'alejandro.martinez@teacch.help'
    });
  }
}
