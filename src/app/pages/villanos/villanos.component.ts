import { Component, OnInit } from '@angular/core';
import { VillanoModel } from 'src/app/models/villano.model';
import { VillanosService } from 'src/app/services/villanos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-villanos',
  templateUrl: './villanos.component.html',
  styleUrls: ['./villanos.component.css']
})
export class VillanosComponent implements OnInit {

  villanos: VillanoModel[] = [];
  cargando = true;

  constructor( private _villanosServices: VillanosService) { }

  ngOnInit(): void {
    this._villanosServices.getVillanos().subscribe(resp => {
      this.villanos = resp;
      this.cargando = false;
    });

  }
  
  private borrarVillano(villano: VillanoModel, i: number) {
    Swal.fire({
      title: 'Estas seguro?',
      text: `Estas seguro que deseas eliminar a ${ villano.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!!!'
    }).then( resp => {
      if (resp.value) {
        this.villanos.splice(i, 1);
        this._villanosServices.borrarVillano(villano.id).subscribe();         
        }
    })
  }

}
