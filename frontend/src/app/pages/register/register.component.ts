import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/shared/models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  emailConfirmationMessage: boolean = false;

  user!: UserModel;

  sendingMessage: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
      if (this.user.token) {
        this.router.navigate(['/']);
      }
    });
    this.registerForm = this.fb.group({
      // Obligatory
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      userTypeId: ['USER'],
      password: ['', Validators.required],
    });
  }
  ngOnInit() {
    if (this.isSubmitting || !this.isFormValid) {
      this.logFormStatus(); // Log form status before early return
      return;
    }

    this.isSubmitting = true; // Disable the button
    this.sendingMessage = 'Guardando datos...'; // Show sending message
  }

  send() {
    if (this.isSubmitting || !this.isFormValid) {
      this.logFormStatus(); // Log form status before early return
      return;
    }

    this.isSubmitting = true; // Disable the button
    this.sendingMessage = 'Guardando datos...'; // Show sending message

    this.userService.post(this.registerForm.value).subscribe({
      next: (res) => {
        this.sendingMessage = ''; // Clear sending message
        this.successMessage = 'Usuario registrado correctamente!'; // Show success message
        this.errorMessage = ''; // Clear any previous error messages
        this.emailConfirmationMessage = true
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 5000);
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
    const controls = this.registerForm.controls;
    for (const controlName in controls) {
      if (controls.hasOwnProperty(controlName)) {
        const control = controls[controlName];
      }
    }
  }
  get isFormValid(): boolean {
    // Check if the form is valid overall
    const isFormValid = this.registerForm.valid;

    // Validate arrival date if it's enabled
    const formValue = this.registerForm.value;

    if (formValue.email && formValue.password) {
      return true;
    }

    return isFormValid;
  }

  getMissingFields(): string[] {
    const missingFields: string[] = [];
    const controls = this.registerForm.controls;

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
    const control = this.registerForm.get(controlName);
    const formValue = this.registerForm.value;

    if (control?.hasError('required')) {
      return `El campo ${controlName} es obligatorio.`; // More user-friendly message
    } else if (control?.hasError('email')) {
      return 'Ingrese un correo electrónico válido.';
    }
    return '';
  }
}
