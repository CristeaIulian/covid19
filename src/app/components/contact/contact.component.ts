import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  contactForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', []),
    comment: new FormControl('', [Validators.required]),
  });

  constructor(private snackBar: MatSnackBar) {}

  onSubmit(): void {
    console.log('response', this.contactForm.value);
    this.snackBar.open('Your message has been save successfully!', 'Close', {
      duration: 2000,
    });
  }
}
