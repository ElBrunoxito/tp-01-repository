import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../service/auth-service';
import { StorageService } from '../../../service/storage-service';
import { ResponseUserDTO, UpdateUserDTO } from '../../../model/User';
import da from '@angular/common/locales/da';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-user',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './info-user.html',
  styleUrl: './info-user.css',
})
export class InfoUser {
profileForm!: FormGroup;

  constructor() {}
  cdr= inject(ChangeDetectorRef)
  fb = inject(FormBuilder)
  auth = inject(AuthService);
  storage = inject(StorageService)
  router = inject(Router)

  id: any

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {

    const user:ResponseUserDTO= this.storage.getUser()
    this.id = user.id
     this.auth.getById(user.id).subscribe({
      next:(res:ResponseUserDTO)=>{
        this.profileForm = this.fb.group({
          name: [res.name, [Validators.required]],
          username: [res.username, [Validators.required, Validators.email]],
          work: [res.work],
          nameChild: [res.nameChild],
          ageChild: [res.ageChild, [Validators.min(0)]],
          genderChild: [res.genderChild],
          levelTEA: [res.levelTEA],
          currentPassword: [''],
          password: ['', [Validators.minLength(8)]]
        });
        this.cdr.detectChanges();
      },
      error:(err)=>{
        console.error(err.error)
      }
     })
    

  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const data = this.profileForm.value as UpdateUserDTO
      this.auth.update(this.id,data).subscribe({
        next: (res)=>{
          this.storage.setUser(res)
          this.router.navigate([`/app`]);

        },
        error: (err)=>{
          alert("A ocurrido un error: " + err.error)
        }
      })
      
    }
  }

  onCancel(): void {
    this.profileForm.reset({
      fullName: 'Alejandro Martínez',
      email: 'alejandro.martinez@teacch.help'
    });
  }
}
