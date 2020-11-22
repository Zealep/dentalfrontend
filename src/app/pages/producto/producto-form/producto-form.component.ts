import { Producto } from './../../../models/producto';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoService } from './../../../services/producto.service';
import { CategoriaService } from './../../../services/categoria.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Categoria } from './../../../models/categoria';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'zp-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements OnInit {

  categorias: Categoria[] = []
  idProducto: number;

  form: FormGroup = new FormGroup({
    categoria: new FormControl(''),
    codigo: new FormControl(''),
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    stock: new FormControl(''),
    stockMinimo: new FormControl(''),
    precioVenta: new FormControl('')
  });


  constructor(private categoriaService: CategoriaService,
    private productoService: ProductoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idProducto = +this.route.snapshot.paramMap.get('product');
    this.loadProduct(this.idProducto);
    this.listCategorias();
  }

  listCategorias() {
    this.categoriaService.getAll()
      .subscribe(x => {
        this.categorias = x;
      })

  }

  grabar() {
    console.log('form', this.form);

    let producto = new Producto();
    let categoria = new Categoria();
    if(this.idProducto!=0){
      producto.idProducto = this.idProducto;
    }
    categoria.idCategoria = this.form.get('categoria').value;
    producto.categoria = categoria;
    producto.codigo = this.form.get('codigo').value;
    producto.nombre = this.form.get('nombre').value;
    producto.descripcion = this.form.get('descripcion').value;
    producto.stock = this.form.get('stock').value;
    producto.stockMinimo = this.form.get('stockMinimo').value;
    producto.precioVenta = this.form.get('precioVenta').value;

    this.productoService.save(producto)
      .subscribe(result => {
        this.router.navigate(['/pages/producto']);
        if(this.idProducto==0){
          this.snackBar.open('Producto fue registrado', 'Cerrar', {
            duration: 3000
          });
        }
        else{
          this.snackBar.open('Producto fue modificado', 'Cerrar', {
            duration: 3000
          });
        }
      });
   }

   loadProduct(id:number){
      if(id!=0){
        this.productoService.getById(id)
        .subscribe(r =>{
        this.form.controls['categoria'].setValue(r.categoria.idCategoria);
        this.form.controls['codigo'].setValue(r.codigo);
        this.form.controls['nombre'].setValue(r.nombre);
        this.form.controls['descripcion'].setValue(r.descripcion);
        this.form.controls['stock'].setValue(r.stock);
        this.form.controls['stockMinimo'].setValue(r.stockMinimo);
        this.form.controls['precioVenta'].setValue(r.precioVenta);
        })

      }
   }

  cancelar() {
        this.router.navigate(['/pages/producto']);
      }
}

