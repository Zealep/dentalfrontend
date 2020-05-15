import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from './../../../models/usuario';
import { UsuarioService } from './../../../services/usuario.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'zp-usuario-alta',
  templateUrl: './usuario-alta.component.html',
  styleUrls: ['./usuario-alta.component.css']
})
export class UsuarioAltaComponent implements OnInit {

  idUsuario: number;

  form: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    rol: new FormControl('')
  })


  constructor(private usuarioService: UsuarioService,
    public dialogRef: MatDialogRef<UsuarioAltaComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  save(){
    let usuario = new Usuario();
    usuario.nombre = this.form.get('nombre').value;
    usuario.username = this.form.get('username').value;
    usuario.password = this.form.get('password').value;
    usuario.rol = this.form.get('rol').value;

    this.usuarioService.registrar(usuario)
    .subscribe(result=>{
      this.snackBar.open('El usuario se registro correctamente','Cerrar',{
        duration: 4000
      });
      this.dialogRef.close();
    })
  }

  onCancel(){
    this.dialogRef.close();
  }

}
