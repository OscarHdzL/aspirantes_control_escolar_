import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuItem } from '../interfaces/menu-item.interface';
import { trackById } from '../../../../utils/track-by';
import { PopoverRef } from '../../../../components/popover/popover-ref';
import { Router } from '@angular/router';

export interface OnlineStatus {
  id: 'online' | 'away' | 'dnd' | 'offline';
  label: string;
  icon: string;
  colorClass: string;
}

@Component({
  selector: 'vex-toolbar-user-dropdown',
  templateUrl: './toolbar-user-dropdown.component.html',
  styleUrls: ['./toolbar-user-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarUserDropdownComponent implements OnInit {
  datosAspirante: any;
  items: MenuItem[] = [
    {
      id: '1',
      icon: 'mat:power_settings_new',
      label: 'Cerrar sesión',
      description: '',
      colorClass: 'text-teal',
      route: '/inicio'
    }
  ];

  statuses: OnlineStatus[] = [
    {
      id: 'online',
      label: 'Online',
      icon: 'mat:check_circle',
      colorClass: 'text-green'
    },
    {
      id: 'away',
      label: 'Away',
      icon: 'mat:access_time',
      colorClass: 'text-orange'
    },
    {
      id: 'dnd',
      label: 'Do not disturb',
      icon: 'mat:do_not_disturb',
      colorClass: 'text-red'
    },
    {
      id: 'offline',
      label: 'Offline',
      icon: 'mat:offline_bolt',
      colorClass: 'text-gray'
    }
  ];

  activeStatus: OnlineStatus = this.statuses[0];

  trackById = trackById;

  constructor(private cd: ChangeDetectorRef,
              private popoverRef: PopoverRef<ToolbarUserDropdownComponent>,
              private router: Router,
              ) { }

  ngOnInit() {

    this.datosAspirante = JSON.parse(localStorage.getItem("aspirante"))[0];

  }

  setStatus(status: OnlineStatus) {
    this.activeStatus = status;
    this.cd.markForCheck();
  }

  close() {
    this.popoverRef.close();
  }


  clickBoton(label){

    switch(label){
      case 'Cerrar sesión':
        /* alert('se cierra sesion') */
        localStorage.clear();
        this.router.navigate(['/inicio']);
      break;
    }

  }
}
