import { Component, OnInit } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'datos', type: 'link', name: 'Datos personales', icon: 'person' },
  { state: 'button', type: 'link', name: 'Imagenes y archivos', icon: 'collections' },
  { state: 'grid', type: 'link', name: 'Controles', icon: 'date_range' },
  { state: 'lists', type: 'link', name: 'Citas', icon: 'alarm_add' },
  { state: 'menu', type: 'link', name: 'Planes de tratamiento', icon: 'assignment' },
  { state: 'tabs', type: 'link', name: 'Pagos', icon: 'payment' },
];


@Component({
  selector: 'zp-sidebar-paciente',
  templateUrl: './sidebar-paciente.component.html',
  styleUrls: ['./sidebar-paciente.component.scss']
})
export class SidebarPacienteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
