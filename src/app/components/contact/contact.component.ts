import { Component } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';

import { ToastService } from '@memobit/angular/services/toast/toast.service';

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

  constructor(private toastService: ToastService) {}

  onSubmit(): void {
    console.log('response', this.contactForm.value);

    this.toastService.show({
      message: 'Your message has been save successfully!',
      timeout: 2000,
    });
  }
}
