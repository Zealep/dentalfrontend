import { User } from './../../../models/user';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'zp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private router: Router) { }

  ngOnInit() {
  }

  submit() {
    if(this.form.valid) {
      this.validateLogin(this.form.value);
    }
  }

  private validateLogin(user: User) {
    console.log('user', user);
    if(user.username === 'admin' && user.password === 'admin') {
      // Redireccion: /products
      this.router.navigate(['/products']);
    } else {
      console.error('Credenciales Invalidas');
    }
  }
}
