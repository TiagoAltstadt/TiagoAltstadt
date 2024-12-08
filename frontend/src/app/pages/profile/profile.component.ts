import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/shared/models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user!: UserModel;
  editForm: FormGroup;
  sendingMessage: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  isSubmitting: boolean = false;
  editInterface: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
    this.editForm = this.fb.group({
      id: [this.user.id],
      name: [this.user.name],
      surname: [this.user.surname],
      email: [this.user.email, [Validators.email]],
      phone: [this.user.phone],
      address: [this.user.address],
      token: [this.user.token],
      userTypeId: [this.user.userTypeId],
    });
  }
  ngOnInit() {
    if (!this.user.token) {
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.userService.logout();
  }

  enableEditInterface() {
    this.editInterface = !this.editInterface;
  }

  send() {
    if (this.isSubmitting || !this.isFormValid) {
      this.logFormStatus(); // Log form status before early return
      return;
    }

    this.isSubmitting = true; // Disable the button
    this.sendingMessage = 'Guardando datos...'; // Show sending message
    console.log('this.editForm.value', this.editForm.value);

    this.userService.patch(this.editForm.value).subscribe({
      next: (res) => {
        this.sendingMessage = ''; // Clear sending message
        this.successMessage = 'Cambios guardados Correctamente!'; // Show success message
        this.errorMessage = ''; // Clear any previous error messages
        location.reload();
        
      },
      error: (error) => {
        this.sendingMessage = ''; // Clear sending message
        this.successMessage = ''; // Clear any previous success messages
        this.errorMessage =
          'Hubo un problema al enviar tu consulta. Por favor, inténtalo de nuevo más tarde.'; // Show error message
      },
      complete: () => {
        this.isSubmitting = false; // Re-enable the button
      },
    });
  }
  logFormStatus() {
    const controls = this.editForm.controls;
    for (const controlName in controls) {
      if (controls.hasOwnProperty(controlName)) {
        const control = controls[controlName];
        console.log(`${controlName}:`, {
          value: control.value,
          valid: control.valid,
          errors: control.errors,
          touched: control.touched,
          dirty: control.dirty,
        });
      }
    }
  }
  get isFormValid(): boolean {
    // Check if the form is valid overall
    const isFormValid = this.editForm.valid;

    // Validate arrival date if it's enabled
    const formValue = this.editForm.value;

    if (formValue.email && formValue.password) {
      return true;
    }

    return isFormValid;
  }

  getMissingFields(): string[] {
    const missingFields: string[] = [];
    const controls = this.editForm.controls;

    for (const key in controls) {
      if (controls[key].invalid && controls[key].touched) {
        missingFields.push(key);
      }
    }

    return missingFields;
  }

  getMissingFieldsMessage(): string {
    const missingFields = this.getMissingFields();
    if (missingFields.length > 0) {
      return `Por favor complete los siguientes campos: ${missingFields.join(
        ', '
      )}.`;
    }
    return '';
  }

  getGlobalErrorMessage(): string {
    const missingFieldsMessage = this.getMissingFieldsMessage();
    if (missingFieldsMessage) {
      return missingFieldsMessage;
    }
    if (!this.isFormValid) {
      return '¡Por favor, complete todos los campos obligatorios!';
    }
    return '';
  }

  getSpecificErrorMessage(controlName: string): string {
    const control = this.editForm.get(controlName);
    const formValue = this.editForm.value;

    if (control?.hasError('required')) {
      return `El campo ${controlName} es obligatorio.`; // More user-friendly message
    } else if (control?.hasError('email')) {
      return 'Ingrese un correo electrónico válido.';
    }
    return '';
  }
}
