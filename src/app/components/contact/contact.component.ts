import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';

// import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  contactForm = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    firstName: new UntypedFormControl('', [Validators.required]),
    lastName: new UntypedFormControl('', []),
    comment: new UntypedFormControl('', [Validators.required]),
  });

  constructor(private snackBar: MatSnackBar) {}

  onSubmit(): void {
    console.log('response', this.contactForm.value);
    this.snackBar.open('Your message has been save successfully!', 'Close', {
      duration: 2000,
    });
  }
}
