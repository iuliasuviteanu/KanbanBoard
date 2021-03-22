import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form = this.fb.group({
    username: ['', Validators.required],
    password: ['']
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    // this.initializeForm();
  }

  initializeForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['']
    });
  }

  onSubmit() {
    this.auth.login(this.form.value);
  }

}
