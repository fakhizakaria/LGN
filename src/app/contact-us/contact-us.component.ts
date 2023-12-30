import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { EmailService } from '../services/email.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUSComponent {
  contactForm: FormGroup;
  private emailSubscription: Subscription | undefined;
  showPopup: boolean = false;
  popupTitle: string = '';
  popupMessage: string = '';
  mailSended: boolean = false;

  locationImagePath: string = 'assets/images/events/emplacement.png';
  mailImagePath: string = 'assets/images/social_media/mail.png';
  phoneImagePath: string = 'assets/images/social_media/phone.png';


  constructor(private formBuilder: FormBuilder, private emailService: EmailService) {
    this.contactForm = this.createContactForm();
  }

  ngOnDestroy() {
    this.emailSubscription?.unsubscribe();
  }

  createContactForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, this.nameValidator]],
      email: ['', [Validators.required, this.customEmailValidator]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.emailSubscription = this.emailService.sendContactForm(this.contactForm.value).subscribe({
        next: (response) => {
          console.log('Email sent successfully!', response);

          this.popupTitle = 'Success';
          this.popupMessage = 'Email sent successfully!';
          this.showPopup = true;
        },
        error: (err) => {
          console.error('Error sending email:', err);

          this.popupTitle = 'Error';
          this.popupMessage = 'Failed to send email.';
          this.showPopup = true;
        }
      });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  nameValidator(control: AbstractControl): ValidationErrors | null {
    const nameRegex = /^[A-Za-z\s'-]+$/;
    return nameRegex.test(control.value) ? null : { invalidName: true };
  }

  customEmailValidator(control: AbstractControl): ValidationErrors | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(control.value) ? null : { invalidEmail: true };
  }

  closePopup() {
    this.showPopup = false;
  }
}
