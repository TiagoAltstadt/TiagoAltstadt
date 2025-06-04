import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
  email: string | null = '';
  confirmationCode: string | null = '';
  error: boolean = false;
  success: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.email = this.route.snapshot.paramMap.get('email');
    this.confirmationCode =
      this.route.snapshot.paramMap.get('confirmationCode');


    if (this.email && this.confirmationCode) {
      this.userService
        .confirmEmail(this.email, this.confirmationCode)
        .subscribe({
          next: (response) => {
            // Assuming success means the response has a message or something valid
            this.success = true;
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 5000);
          },
          error: (err) => {
            this.error = true;
          },
        });
    }
  }
}
