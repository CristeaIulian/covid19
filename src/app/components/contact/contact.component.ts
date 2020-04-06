import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HttpService } from '../../services/http/http.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', []),
    comment: new FormControl('', [Validators.required])
  });

  constructor(
    private httpService: HttpService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    const path = 'https://reqres.in/api/users';
    this.httpService
      .addData(path, this.contactForm.value)
      .subscribe(response => {
        console.log('response', response);
        this.snackBar.open(
          'Your message has been save successfully!',
          'Close',
          {
            duration: 2000
          }
        );
      });
  }
}
