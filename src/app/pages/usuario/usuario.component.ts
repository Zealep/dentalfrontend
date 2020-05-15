import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogModel } from './../../shared/models/confirm-dialog-model';
import { ConfirmDialogComponent } from './../../shared/components/confirm-dialog/confirm-dialog.component';
import { UsuarioAltaComponent } from './usuario-alta/usuario-alta.component';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioService } from './../../services/usuario.service';
import { Usuario } from './../../models/usuario';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'zp-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  displayedColumns: string[] = ['nombre','username','rol','acciones'];
  dataSource: MatTableDataSource<Usuario>;
  usuarios : Usuario[];

  constructor(private usuarioService:UsuarioService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getUsuarios();
    this.getCatchError();
  }

  private getCatchError(){
    this.usuarioService.getById(6)
    .pipe(
      catchError(response =>{
        console.log('error captcheado',response);
        this.snackBar.open(response.error.message,'Cerrar',{
          duration:4000
        });
        return EMPTY;
      })
    )
    .subscribe(data =>{
      console.log('data');
    })
  }

  getUsuarios(){
    this.usuarioService.getlistar()
    .subscribe(results=>{
      console.log(results);
      this.usuarios = results;
      this.dataSource = new MatTableDataSource(this.usuarios);
    })
  }

  deleteUsuario(usuario: Usuario){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '600px',
      data: <ConfirmDialogModel>{
        title: 'Eliminar egreso',
        message: 'Deseas borrar el egreso?'
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if(result) {
          this.sendDeleteRequest(usuario);
        }
      });
  }

  openDialog(){
    const dialogRef = this.dialog.open(UsuarioAltaComponent, {
      width: '400px',    
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUsuarios();
    });
  }
  
  private sendDeleteRequest(usuario: Usuario) {
    this.usuarioService.eliminar(usuario.idUsuario)
    .subscribe(response => {
      this.getUsuarios();
      this.snackBar.open('Usuario eliminado', 'Close', {
        duration: 3000
      });
    });
  }

}
