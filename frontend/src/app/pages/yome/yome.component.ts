import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { YomeService } from 'src/app/services/yome.service';
import { ExpenseInterface } from 'src/app/shared/interfaces/expenseInterface';
import { GroupInterface } from 'src/app/shared/interfaces/groupInterface';
import { UserModel } from 'src/app/shared/models/User';

@Component({
  selector: 'app-yome',
  templateUrl: './yome.component.html',
  styleUrls: ['./yome.component.scss'],
})
export class YomeComponent implements OnInit {
  allGroups: GroupInterface[] = [];
  allExpenses: ExpenseInterface[] = [];
  createGroupForm: FormGroup;
  sendingMessage: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  isSubmitting: boolean = false;
  user!: UserModel;

  constructor(
    private yomeService: YomeService,
    private fb: FormBuilder,
    public userService: UserService
  ) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
    this.createGroupForm = this.fb.group({
      // Obligatory
      name: ['', [Validators.required]],
      description: ['', Validators.required],
      creatorId: [],
      members: [],
    });
  }
  ngOnInit() {
    this.getGroups();
    this.getExpenses();
  }

  getExpenses() {
    this.yomeService
      .getUserExpenses(this.user.id)
      .subscribe((res: ExpenseInterface[]) => {
        this.allExpenses = res;
        console.log(res);
      });
  }
  getGroups() {
    this.yomeService.getGroups().subscribe((res) => {
      this.allGroups = res;
    });
  }
  deleteGroup(groupId: string) {
    this.yomeService.deleteGroup(groupId).subscribe((res) => {
      console.log(res);
      this.getGroups();
    });
  }
  deleteExpense(expenseId: string) {
    this.yomeService.deleteExpense(expenseId).subscribe((res) => {
      console.log(res);
      this.getExpenses();
    });
  }

  createGroup() {
    if (this.isSubmitting || !this.isFormValid) {
      this.logFormStatus(); // Log form status before early return
      return;
    }

    this.isSubmitting = true; // Disable the button
    this.sendingMessage = 'Creando grupo...'; // Show sending message

    this.createGroupForm.value.creatorId = this.user.id;
    this.createGroupForm.value.members = [];
    console.log(this.createGroupForm.value);

    this.yomeService.createGroup(this.createGroupForm.value).subscribe({
      next: (res) => {
        this.sendingMessage = ''; // Clear sending message
        this.successMessage = 'Inicio de sesion exitoso!'; // Show success message
        this.errorMessage = ''; // Clear any previous error messages
      },
      error: (error) => {
        this.sendingMessage = ''; // Clear sending message
        this.successMessage = ''; // Clear any previous success messages
        this.errorMessage =
          'Hubo un problema al crear el grupo, por favor notifica a tiagoaltstat@gmail.com.'; // Show error message
      },
      complete: () => {
        this.isSubmitting = false; // Re-enable the button
      },
    });
  }
  logFormStatus() {
    const controls = this.createGroupForm.controls;
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
    const isFormValid = this.createGroupForm.valid;

    // Validate arrival date if it's enabled
    const formValue = this.createGroupForm.value;

    if (formValue.email && formValue.password) {
      return true;
    }

    return isFormValid;
  }

  getMissingFields(): string[] {
    const missingFields: string[] = [];
    const controls = this.createGroupForm.controls;

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
    const control = this.createGroupForm.get(controlName);
    const formValue = this.createGroupForm.value;

    if (control?.hasError('required')) {
      return `El campo ${controlName} es obligatorio.`; // More user-friendly message
    } else if (control?.hasError('email')) {
      return 'Ingrese un correo electrónico válido.';
    }
    return '';
  }
}
