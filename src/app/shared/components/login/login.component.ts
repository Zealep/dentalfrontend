import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TOKEN_NAME } from './../../var.constant';
import { LoginService } from './../../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';

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

  constructor(private router: Router,
    private loginService: LoginService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  submit() {
    if(this.form.valid) {
      this.validateLogin(this.form.value);
    }
  }

  private validateLogin(user: Usuario) {
    this.loginService.login(user.username,user.password)
    .pipe(
      catchError(response => {
        console.log('error captcheado lgoin',response);
      this.snackBar.open(response, 'Cerrar', {
        duration: 3000
      });
      // catch & replace
      return EMPTY;
      })
      )
    .subscribe(data =>{
      if(data){
        let token = JSON.stringify(data);
        sessionStorage.setItem(TOKEN_NAME, token);
        this.router.navigate(['pages']);
      }
    });

  }
}
