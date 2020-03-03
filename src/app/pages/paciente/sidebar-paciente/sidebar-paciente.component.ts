import { Component, OnInit } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'av_timer' },
  { state: 'button', type: 'link', name: 'Buttons', icon: 'crop_7_5' },
  { state: 'grid', type: 'link', name: 'Grid List', icon: 'view_comfy' },
  { state: 'lists', type: 'link', name: 'Lists', icon: 'view_list' },
  { state: 'menu', type: 'link', name: 'Menu', icon: 'view_headline' },
  { state: 'tabs', type: 'link', name: 'Tabs', icon: 'tab' },
  { state: 'stepper', type: 'link', name: 'Stepper', icon: 'web' }
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
