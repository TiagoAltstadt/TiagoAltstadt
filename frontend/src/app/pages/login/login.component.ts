import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  sendingMessage: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  isSubmitting: boolean = false; // Flag to manage button state

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      // Obligatory
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  logFormStatus() {
    const controls = this.loginForm.controls;
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
  send() {
    if (this.isSubmitting || !this.isFormValid) {
      this.logFormStatus(); // Log form status before early return
      return;
    }

    this.isSubmitting = true; // Disable the button
    this.sendingMessage = 'Iniciando sesion...'; // Show sending message
    this.userService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.sendingMessage = ''; // Clear sending message
        this.successMessage = 'Inicio de sesion exitoso!'; // Show success message
        this.errorMessage = ''; // Clear any previous error messages
        this.router.navigate(['/']);
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

  get isFormValid(): boolean {
    // Check if the form is valid overall
    const isFormValid = this.loginForm.valid;

    // Validate arrival date if it's enabled
    const formValue = this.loginForm.value;

    if (formValue.email && formValue.password) {
      return true;
    }

    return isFormValid;
  }

  getMissingFields(): string[] {
    const missingFields: string[] = [];
    const controls = this.loginForm.controls;

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
    const control = this.loginForm.get(controlName);
    const formValue = this.loginForm.value;

    if (control?.hasError('required')) {
      return `El campo ${controlName} es obligatorio.`; // More user-friendly message
    } else if (control?.hasError('email')) {
      return 'Ingrese un correo electrónico válido.';
    }
    return '';
  }
}
