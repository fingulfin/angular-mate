import { Component, inject, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  email,
  form,
  FormField,
  required,
  submit,
} from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import katex from 'katex';

@Component({
  selector: 'auth-sign-in',
  templateUrl: './sign-in.html',
  imports: [
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    FormField,
    MatDivider,
  ],
})
export default class AuthSignIn {
  // Dependencies

  private sanitizer = inject(DomSanitizer);
  private router = inject(Router);

  // State
//  private readonly equation = '\\sum_{i=1}^{n} x_i = \\frac{n(n+1)}{x+2}';
   // private readonly equation = 'c = \\iint\\pm\\sqrt{a^2 + b^2}';
   // private readonly equation = '\\cfrac{a}{1 + \\cfrac{1}{b}}';
  //private readonly equation = '\\Large{\\textcolor{Navy}{a \\over b}}';
  private readonly equation =String.raw`\begin{bmatrix}a & b \\ c & d\end{bmatrix}`;
  protected readonly equationHtml = this.sanitizer.bypassSecurityTrustHtml(
    katex.renderToString(this.equation, { displayMode: true })
  );
  protected signInFormModel = signal({
    email: 'hughes.brian@company.com',
    password: 'Secure-Password-123$%^',
  });
  protected signInForm = form(this.signInFormModel, (form) => {
    required(form.email, { message: 'You must enter an email address' });
    email(form.email, { message: 'You must enter a valid email address' });

    required(form.password, { message: 'You must enter a password' });
  });

  signIn(event: Event) {
    event.preventDefault();

    submit(this.signInForm, async () => {
      // Navigate to a route, demo purposes only
      this.router.navigateByUrl('/admin/dashboards');
    });
  }
}
